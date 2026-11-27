import { NextResponse } from 'next/server';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { CHATBOT_SYSTEM_INSTRUCTION, QUICK_ANSWERS } from '@/app/lib/chatbot-knowledge';
import { QUICK_PROMPTS } from '@/app/lib/quick-prompts';

// Groq is tried first because it starts answering in well under a second; Gemini is the backup.
const GROQ_MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
const GEMINI_MODELS = [
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview',
];

// Limits on what a visitor can send, so one request can't run up a huge prompt.
const MAX_TURNS = 12;
const MAX_CHARS = 2000;
const MAX_TOKENS = 1024;

type Turn = { role: 'user' | 'model'; text: string };
type Attempt = { name: string; run: () => Promise<AsyncIterable<string>> };

const NO_KEY_REPLY =
    "Hi! I'm **Jinny**, Abdulahad's portfolio assistant. Live answers aren't switched on right now, but in short: Abdulahad is a **Full Stack Software Engineer** at **BitLogicx** working with Next.js, React, Vue, Node.js and AdonisJS. Have a look at his [work](/work) or send a message from the [contact page](/contact).";

const streamResponse = (chunks: AsyncIterable<string>) => {
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
        async start(controller) {
            try {
                for await (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
            } catch (err) {
                console.error('Chatbot stream error:', err);
                controller.enqueue(encoder.encode('\n\n_Sorry, the answer was cut off. Please try again._'));
            }
            controller.close();
        },
    });
    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            'X-Accel-Buffering': 'no',
        },
    });
};

async function* once(text: string) {
    yield text;
}

// Groq speaks the OpenAI chat API; read its server-sent events and yield the text deltas.
async function* groqStream(apiKey: string, model: string, history: Turn[]) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model,
            stream: true,
            temperature: 0.3,
            max_tokens: MAX_TOKENS,
            // gpt-oss reasons before answering; keep that short so the first word comes quickly.
            ...(model.startsWith('openai/gpt-oss') && { reasoning_effort: 'medium' }),
            messages: [
                { role: 'system', content: CHATBOT_SYSTEM_INSTRUCTION },
                ...history.map((m) => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.text })),
            ],
        }),
        signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok || !res.body) throw new Error(`Groq ${model} ${res.status}: ${(await res.text()).slice(0, 200)}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    for (let r = await reader.read(); !r.done; r = await reader.read()) {
        buffer += decoder.decode(r.value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            const text = JSON.parse(data).choices?.[0]?.delta?.content;
            if (text) yield text as string;
        }
    }
}

async function* geminiStream(ai: GoogleGenAI, model: string, history: Turn[]) {
    const stream = await ai.models.generateContentStream({
        model,
        contents: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
        config: {
            systemInstruction: CHATBOT_SYSTEM_INSTRUCTION,
            temperature: 0.5,
            maxOutputTokens: MAX_TOKENS,
            // Portfolio Q&A doesn't need long reasoning; default thinking delayed the first word a lot.
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
        },
    });
    for await (const chunk of stream) if (chunk.text) yield chunk.text;
}

// Wait for the first piece of text so a failing provider can still fall through to the next one.
async function startStream(chunks: AsyncIterable<string>) {
    const it = chunks[Symbol.asyncIterator]();
    const first = await it.next();
    if (first.done) throw new Error('empty response');
    return (async function* () {
        yield first.value;
        for (let r = await it.next(); !r.done; r = await it.next()) yield r.value;
    })();
}

// Replies are streamed as plain text chunks; errors before the first chunk come back as JSON.
export async function POST(request: Request) {
    let history: Turn[];
    try {
        const { messages, message } = await request.json();
        const raw: { role?: string; text?: string; content?: string }[] = Array.isArray(messages)
            ? messages
            : typeof message === 'string'
              ? [{ role: 'user', text: message }]
              : [];
        history = raw
            .map((m) => ({
                role: (m.role === 'model' || m.role === 'assistant' ? 'model' : 'user') as Turn['role'],
                text: String(m.text ?? m.content ?? '').trim().slice(0, MAX_CHARS),
            }))
            .filter((m) => m.text)
            .slice(-MAX_TURNS);
        // The models expect the conversation to start with the user.
        while (history.length && history[0].role === 'model') history.shift();
    } catch {
        history = [];
    }

    if (!history.length || history[history.length - 1].role !== 'user') {
        return NextResponse.json({ success: false, message: 'A message is required.' }, { status: 400 });
    }

    // The quick-prompt buttons have answers written ahead of time, so they show instantly.
    const question = history[history.length - 1].text;
    const quick = QUICK_PROMPTS.find((q) => q.prompt === question);
    if (quick) return streamResponse(once(QUICK_ANSWERS[quick.label]));

    const attempts: Attempt[] = [];
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
        const preferred = process.env.GROQ_MODEL;
        const models = preferred ? [preferred, ...GROQ_MODELS.filter((m) => m !== preferred)] : GROQ_MODELS;
        for (const model of models)
            attempts.push({ name: `groq:${model}`, run: () => startStream(groqStream(groqKey, model, history)) });
    }
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const preferred = process.env.GEMINI_MODEL;
        const models = preferred ? [preferred, ...GEMINI_MODELS.filter((m) => m !== preferred)] : GEMINI_MODELS;
        for (const model of models)
            attempts.push({ name: `gemini:${model}`, run: () => startStream(geminiStream(ai, model, history)) });
    }
    if (!attempts.length) return streamResponse(once(NO_KEY_REPLY));

    let lastError: unknown = null;
    for (const attempt of attempts) {
        try {
            return streamResponse(await attempt.run());
        } catch (err) {
            lastError = err;
            console.warn(`Chat model ${attempt.name} failed, trying fallback:`, err);
        }
    }

    console.error('All chat models failed:', lastError);
    return NextResponse.json(
        { success: false, message: 'Failed to process request with AI assistant.' },
        { status: 500 }
    );
}
