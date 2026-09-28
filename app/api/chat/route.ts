import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { CHATBOT_SYSTEM_INSTRUCTION } from '@/app/lib/chatbot-knowledge';

interface MessagePayload {
    role: 'user' | 'model';
    text: string;
}

const FALLBACK_MODELS = [
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview',
];

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        const { messages, message } = body;

        // Support both single message and conversation history
        let conversationHistory: MessagePayload[] = [];

        if (Array.isArray(messages) && messages.length > 0) {
            conversationHistory = messages.map((m: { role: string; text?: string; content?: string }) => ({
                role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
                text: m.text || m.content || '',
            }));
        } else if (typeof message === 'string' && message.trim().length > 0) {
            conversationHistory = [{ role: 'user', text: message.trim() }];
        } else {
            return NextResponse.json(
                { success: false, message: 'A prompt or message is required.' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                success: true,
                reply:
                    "👋 Hello! I am Jinny, Abdulahad's portfolio AI assistant. To activate live Gemini responses, please set `GEMINI_API_KEY` in the environment variables. In the meantime, Abdulahad is a Full Stack Software Engineer at BitLogicx specializing in Next.js, React, Node.js, Vue, and scalable cloud systems. Feel free to explore his projects and reach out via the contact form!",
            });
        }

        const ai = new GoogleGenAI({ apiKey });

        // Format history for Gemini API: [{ role: 'user' | 'model', parts: [{ text: string }] }]
        const contents = conversationHistory.slice(-8).map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        }));

        const preferredModel = process.env.GEMINI_MODEL;
        const modelsToTry = preferredModel
            ? [preferredModel, ...FALLBACK_MODELS.filter((m) => m !== preferredModel)]
            : FALLBACK_MODELS;

        let reply = '';
        let lastError: unknown = null;

        for (const model of modelsToTry) {
            try {
                const response = await ai.models.generateContent({
                    model,
                    contents,
                    config: {
                        systemInstruction: CHATBOT_SYSTEM_INSTRUCTION,
                        temperature: 0.7,
                        maxOutputTokens: 600,
                    },
                });

                if (response.text) {
                    reply = response.text;
                    break;
                }
            } catch (err) {
                lastError = err;
                console.warn(`Gemini model ${model} failed, trying fallback:`, err);
            }
        }

        if (!reply) {
            console.error('All candidate Gemini models failed:', lastError);
            throw lastError || new Error('Could not generate a response from Gemini.');
        }

        return NextResponse.json({
            success: true,
            reply,
        });
    } catch (error: unknown) {
        console.error('Chatbot API Error:', error);
        const errorMessage =
            error instanceof Error ? error.message : 'An error occurred while generating response.';
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to process request with AI assistant.',
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}
