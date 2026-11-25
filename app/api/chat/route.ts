import { NextResponse } from 'next/server';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { CHATBOT_SYSTEM_INSTRUCTION } from '@/app/lib/chatbot-knowledge';

const FALLBACK_MODELS = [
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview',
];

// Limits on what a visitor can send, so one request can't run up a huge prompt.
const MAX_TURNS = 12;
const MAX_CHARS = 2000;

type Turn = { role: 'user' | 'model'; text: string };

const NO_KEY_REPLY =
    "Hi! I'm **Jinny**, Abdulahad's portfolio assistant. Live answers aren't switched on right now, but in short: Abdulahad is a **Full Stack Software Engineer** at **BitLogicx** working with Next.js, React, Vue, Node.js and AdonisJS. Have a look at his [work](/work) or send a message from the [contact page](/contact).";

const textStream = (chunks: AsyncIterable<string>) => {
    const encoder = new TextEncoder();
    return new ReadableStream<Uint8Array>({
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
};

const streamResponse = (chunks: AsyncIterable<string>) =>
    new Response(textStream(chunks), {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            'X-Accel-Buffering': 'no',
        },
    });

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
        // Gemini expects the conversation to start with the user.
        while (history.length && history[0].role === 'model') history.shift();
    } catch {
        history = [];
    }

    if (!history.length || history[history.length - 1].role !== 'user') {
        return NextResponse.json({ success: false, message: 'A message is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return streamResponse(
            (async function* () {
                yield NO_KEY_REPLY;
            })()
        );
    }

    const ai = new GoogleGenAI({ apiKey });
    const contents = history.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
    const preferred = process.env.GEMINI_MODEL;
    const models = preferred ? [preferred, ...FALLBACK_MODELS.filter((m) => m !== preferred)] : FALLBACK_MODELS;

    // Fall back to the next model only until one starts answering; after that we're committed.
    let lastError: unknown = null;
    for (const model of models) {
        try {
            const stream = await ai.models.generateContentStream({
                model,
                contents,
                config: {
                    systemInstruction: CHATBOT_SYSTEM_INSTRUCTION,
                    temperature: 0.5,
                    maxOutputTokens: 1024,
                    // Portfolio Q&A doesn't need long reasoning; default thinking delayed the first word by 20-30s.
                    thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
                },
            });
            const it = stream[Symbol.asyncIterator]();
            let first = await it.next();
            while (!first.done && !first.value.text) first = await it.next();
            if (first.done) throw new Error(`${model} returned an empty response`);

            return streamResponse(
                (async function* () {
                    yield first.value!.text!;
                    for (let r = await it.next(); !r.done; r = await it.next()) {
                        if (r.value.text) yield r.value.text;
                    }
                })()
            );
        } catch (err) {
            lastError = err;
            console.warn(`Gemini model ${model} failed, trying fallback:`, err);
        }
    }

    console.error('All candidate Gemini models failed:', lastError);
    return NextResponse.json(
        { success: false, message: 'Failed to process request with AI assistant.' },
        { status: 500 }
    );
}
