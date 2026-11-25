'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Ghost, SendHorizontal, Trash2, X } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: string;
}

const QUICK_PROMPTS = [
    { label: 'experience', prompt: 'Tell me about Abdulahad’s work experience and achievements.' },
    { label: 'projects', prompt: 'What key projects has Abdulahad built and what tech stack was used?' },
    { label: 'services', prompt: 'What services does Abdulahad offer to clients and teams?' },
    { label: 'education', prompt: 'What is Abdulahad’s educational background and certifications?' },
    { label: 'contact & hire', prompt: 'How can I get in touch with or hire Abdulahad?' },
];

let messageCounter = 0;
const generateId = (prefix: string) => {
    messageCounter += 1;
    return `${prefix}-${messageCounter}`;
};

function JinnyIcon({ className = 'size-4' }: { className?: string }) {
    return <Ghost className={className} aria-hidden />;
}

// Inline markdown parser for bold, italics, code, links, headers, etc.
function renderInlineContent(text: string): React.ReactNode[] {
    const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|_[^_]+_)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, index) => {
        if (!part) return null;

        // Links: [label](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            // Links to pages on this site open in place; external ones in a new tab.
            const external = !linkMatch[2].startsWith('/');
            return (
                <a
                    key={index}
                    href={linkMatch[2]}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="text-accent font-medium underline decoration-current/40 underline-offset-2 transition-opacity hover:opacity-80"
                >
                    {linkMatch[1]}
                    {external && ' ↗'}
                </a>
            );
        }

        // Bold: **text**
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return (
                <strong key={index} className="text-fg font-semibold">
                    {part.slice(2, -2)}
                </strong>
            );
        }

        // Inline Code: `code`
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
            return (
                <code
                    key={index}
                    className="bg-panel border-line text-accent rounded border px-1.5 py-0.5 font-mono text-[11px]"
                >
                    {part.slice(1, -1)}
                </code>
            );
        }

        // Italics: *text* or _text_
        if (
            (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
            (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
        ) {
            return (
                <em key={index} className="text-muted italic">
                    {part.slice(1, -1)}
                </em>
            );
        }

        return <span key={index}>{part}</span>;
    });
}

function FormattedMarkdown({ content }: { content: string }) {
    // Strip any leading ghost emojis or icon prefixes from the text content itself
    const cleanContent = content.replace(/^[\s\n]*👻[\s\n]*/g, '');
    const rawLines = cleanContent.split('\n');
    const renderedNodes: React.ReactNode[] = [];

    let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;

    const flushList = () => {
        if (currentList) {
            if (currentList.type === 'ul') {
                renderedNodes.push(
                    <ul key={`list-${renderedNodes.length}`} className="my-1.5 space-y-1 pl-1">
                        {currentList.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <div className="flex-1">{item}</div>
                            </li>
                        ))}
                    </ul>
                );
            } else {
                renderedNodes.push(
                    <ol key={`list-${renderedNodes.length}`} className="my-1.5 space-y-1 pl-1">
                        {currentList.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed">
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded text-accent font-mono text-[11px]">
                                    {i + 1}
                                </span>
                                <div className="flex-1">{item}</div>
                            </li>
                        ))}
                    </ol>
                );
            }
            currentList = null;
        }
    };

    rawLines.forEach((line, lineIdx) => {
        const trimmed = line.trim();

        // Horizontal divider (---, ***, ___)
        if (/^([-*_]){3,}$/.test(trimmed)) {
            flushList();
            renderedNodes.push(
                <hr
                    key={`hr-${lineIdx}`}
                    className="my-2.5 border-line border-0 border-t"
                />
            );
            return;
        }

        // Empty line / paragraph break
        if (!trimmed) {
            flushList();
            renderedNodes.push(<div key={`space-${lineIdx}`} className="h-1.5" />);
            return;
        }

        // Headings (###, ##, #)
        const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
        if (headingMatch) {
            flushList();
            const level = headingMatch[1].length;
            const headingText = headingMatch[2];
            renderedNodes.push(
                <div
                    key={`head-${lineIdx}`}
                    className={`text-fg font-semibold ${
                        level === 1
                            ? 'mt-3 mb-1 text-base font-bold'
                            : level === 2
                              ? 'mt-2.5 mb-1 text-sm font-bold'
                              : 'mt-2 mb-0.5 text-accent text-[13px] font-semibold'
                    }`}
                >
                    {renderInlineContent(headingText)}
                </div>
            );
            return;
        }

        // Unordered list item (- , * , • )
        const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
        if (bulletMatch) {
            if (!currentList || currentList.type !== 'ul') {
                flushList();
                currentList = { type: 'ul', items: [] };
            }
            currentList.items.push(renderInlineContent(bulletMatch[1]));
            return;
        }

        // Numbered list item (1. , 2. )
        const numberMatch = trimmed.match(/^\d+\.\s+(.*)$/);
        if (numberMatch) {
            if (!currentList || currentList.type !== 'ol') {
                flushList();
                currentList = { type: 'ol', items: [] };
            }
            currentList.items.push(renderInlineContent(numberMatch[1]));
            return;
        }

        // Regular paragraph line
        flushList();
        renderedNodes.push(
            <p key={`p-${lineIdx}`} className="text-[13px] leading-relaxed">
                {renderInlineContent(trimmed)}
            </p>
        );
    });

    flushList();

    return <div className="space-y-1">{renderedNodes}</div>;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome-0',
            role: 'model',
            text: "Hi! I'm **Jinny**, Abdulahad's personal AI portfolio assistant.\n\nAsk me anything about his **experience**, **projects**, **skills**, or **services**!",
            timestamp: 'Just now',
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        // Follow streamed text instantly; smooth scrolling on every chunk lags behind.
        messagesEndRef.current?.scrollIntoView({ behavior: isLoading ? 'auto' : 'smooth', block: 'end' });
        inputRef.current?.focus();
    }, [isOpen, messages, isLoading]);

    const handleOpenChat = () => {
        setIsOpen(true);
        setHasUnread(false);
    };

    const handleToggleChat = () => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                setHasUnread(false);
            }
            return next;
        });
    };

    const handleSendMessage = async (textToSend?: string) => {
        const query = (textToSend || inputMessage).trim();
        if (!query || isLoading) return;

        const userMsg: Message = {
            id: generateId('user'),
            role: 'user',
            text: query,
            timestamp: 'Just now',
        };

        const updatedHistory = [...messages, userMsg];
        setMessages(updatedHistory);
        setInputMessage('');
        setIsLoading(true);

        const botId = generateId('bot');
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Give up rather than spin forever if the model provider stalls.
                signal: AbortSignal.timeout(90_000),
                body: JSON.stringify({
                    messages: updatedHistory.map((m) => ({ role: m.role, text: m.text })),
                }),
            });
            if (!res.ok || !res.body) throw new Error(`Chat request failed (${res.status})`);

            // Append each streamed chunk to the reply as it arrives.
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let text = '';
            for (let r = await reader.read(); !r.done; r = await reader.read()) {
                text += decoder.decode(r.value, { stream: true });
                const current = text;
                setMessages((prev) =>
                    prev.some((m) => m.id === botId)
                        ? prev.map((m) => (m.id === botId ? { ...m, text: current } : m))
                        : [...prev, { id: botId, role: 'model', text: current, timestamp: 'Just now' }]
                );
            }
            if (!text.trim()) throw new Error('Empty reply');
        } catch (err) {
            console.error('Chat error:', err);
            const errorMsg: Message = {
                id: generateId('error'),
                role: 'model',
                text: 'Sorry, I could not process your request right now. Feel free to email Abdulahad directly at [abdulahadhussain60@gmail.com](mailto:abdulahadhussain60@gmail.com).',
                timestamp: 'Just now',
            };
            setMessages((prev) => [...prev.filter((m) => m.id !== botId), errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        setMessages([
            {
                id: generateId('reset'),
                role: 'model',
                text: "Conversation cleared! What would you like to know about Abdulahad's work?",
                timestamp: 'Just now',
            },
        ]);
    };

    return (
        <aside
            aria-label="AI Assistant"
            className="fixed right-4 bottom-4 z-50 flex flex-col items-end sm:right-6 sm:bottom-6"
        >
            {/* Chat Window */}
            {isOpen && (
                <section
                    aria-label="Jinny Portfolio AI Chatbot"
                    className="bg-panel border-line mb-3 flex h-[min(540px,calc(100dvh-6.5rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]"
                >
                    {/* Header */}
                    <div className="border-line flex items-center justify-between border-b px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="border-line text-accent relative grid size-9 place-items-center rounded-lg border">
                                <JinnyIcon className="size-[18px]" />
                                <span className="border-panel absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 bg-emerald-500" />
                            </div>
                            <div className="leading-tight">
                                <h3 className="font-heading text-sm font-semibold">
                                    Jinny
                                </h3>
                                <p className="text-muted font-mono text-[11px]">
                                    portfolio assistant · ai
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={handleClearChat}
                                title="Clear conversation"
                                className="text-muted hover:text-fg hover:bg-bg cursor-pointer rounded-md p-1.5 transition-colors"
                                aria-label="Clear chat"
                            >
                                <Trash2 className="size-4" aria-hidden />
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-muted hover:text-fg hover:bg-bg cursor-pointer rounded-md p-1.5 transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="size-4" aria-hidden />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div
                        data-lenis-prevent
                        className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 text-sm"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'model' && (
                                    <div className="border-line text-accent mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border">
                                        <JinnyIcon className="size-3.5" />
                                    </div>
                                )}

                                <div
                                    className={`flex max-w-[85%] flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`rounded-xl px-3.5 py-2.5 ${
                                            msg.role === 'user'
                                                ? 'bg-accent text-on-accent rounded-tr-sm'
                                                : 'bg-bg border-line rounded-tl-sm border'
                                        }`}
                                    >
                                        {msg.role === 'user' ? (
                                            <p className="text-[13px] leading-relaxed font-medium break-words">
                                                {msg.text}
                                            </p>
                                        ) : (
                                            <FormattedMarkdown content={msg.text} />
                                        )}
                                    </div>
                                    <span className="text-muted mt-1 px-1 font-mono text-[10px]">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isLoading && messages[messages.length - 1]?.role === 'user' && (
                            <div className="flex items-center gap-2.5" role="status">
                                <div className="border-line text-accent grid size-7 shrink-0 place-items-center rounded-md border">
                                    <JinnyIcon className="size-3.5" />
                                </div>
                                <div className="bg-bg border-line text-muted flex items-center gap-2 rounded-xl border px-3.5 py-2.5 font-mono text-xs">
                                    thinking
                                    <span className="flex items-center gap-1">
                                        <span className="bg-accent size-1 animate-bounce rounded-full [animation-delay:-0.3s]" />
                                        <span className="bg-accent size-1 animate-bounce rounded-full [animation-delay:-0.15s]" />
                                        <span className="bg-accent size-1 animate-bounce rounded-full" />
                                    </span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    <div className="border-line border-t px-3 py-2">
                        <div className="scrollbar-none flex gap-1.5 overflow-x-auto pb-0.5 font-mono text-[11px]">
                            {QUICK_PROMPTS.map((qp) => (
                                <button
                                    key={qp.label}
                                    type="button"
                                    onClick={() => handleSendMessage(qp.prompt)}
                                    disabled={isLoading}
                                    className="border-line text-muted hover:border-accent hover:text-fg shrink-0 cursor-pointer rounded-md border px-2.5 py-1 transition-colors disabled:opacity-50"
                                >
                                    {qp.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Field */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="border-line flex items-center gap-2 border-t p-3"
                    >
                        <span className="text-accent font-mono text-sm" aria-hidden>
                            &gt;
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="ask about skills, projects, experience..."
                            aria-label="Message Jinny"
                            disabled={isLoading}
                            className="placeholder:text-muted/70 min-w-0 flex-1 bg-transparent py-2 font-mono text-xs outline-none"
                            maxLength={300}
                        />
                        <button
                            type="submit"
                            disabled={!inputMessage.trim() || isLoading}
                            aria-label="Send prompt to Jinny"
                            className="bg-accent text-on-accent grid size-9 shrink-0 cursor-pointer place-items-center rounded-md transition-opacity hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <SendHorizontal className="size-4" aria-hidden />
                        </button>
                    </form>
                </section>
            )}

            {/* Launcher Button & Teaser */}
            <div className="flex items-center gap-2.5">
                {!isOpen && hasUnread && (
                    <button
                        type="button"
                        onClick={handleOpenChat}
                        tabIndex={-1}
                        className="bg-panel border-line hover:border-accent hidden cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs shadow-lg transition-colors sm:flex"
                    >
                        <span className="text-accent">&gt;</span> ask jinny
                    </button>
                )}

                <button
                    type="button"
                    onClick={handleToggleChat}
                    aria-label={isOpen ? 'Close Jinny AI Assistant' : 'Open Jinny AI Assistant'}
                    aria-expanded={isOpen}
                    className="bg-accent text-on-accent relative grid size-12 cursor-pointer place-items-center rounded-xl shadow-[0_12px_30px_-10px_rgb(0_0_0/0.5)] transition-transform hover:-translate-y-0.5 active:scale-95 sm:size-14"
                >
                    {isOpen ? (
                        <X className="size-5" aria-hidden />
                    ) : (
                        <>
                            <JinnyIcon className="size-6" />
                            {hasUnread && (
                                <span className="absolute -top-1 -right-1 flex size-3">
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                                    <span className="border-bg relative inline-flex size-3 rounded-full border-2 bg-emerald-500" />
                                </span>
                            )}
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}
