'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: string;
}

const QUICK_PROMPTS = [
    { label: '💼 Experience', prompt: 'Tell me about Abdulahad’s work experience and achievements.' },
    { label: '🚀 Projects', prompt: 'What key projects has Abdulahad built and what tech stack was used?' },
    { label: '🛠️ Services', prompt: 'What services does Abdulahad offer to clients and teams?' },
    { label: '🎓 Education', prompt: 'What is Abdulahad’s educational background and certifications?' },
    { label: '📬 Contact & Hire', prompt: 'How can I get in touch with or hire Abdulahad?' },
];

let messageCounter = 0;
const generateId = (prefix: string) => {
    messageCounter += 1;
    return `${prefix}-${messageCounter}`;
};

// Friendly Ghost Icon for Jinny 👻
function JinnyIcon({ className = 'text-xl' }: { className?: string }) {
    return (
        <span className={`inline-flex items-center justify-center select-none leading-none ${className}`} aria-hidden="true">
            👻
        </span>
    );
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
            return (
                <a
                    key={index}
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-purple-600 underline decoration-purple-400/50 underline-offset-2 transition-colors hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                >
                    {linkMatch[1]} ↗
                </a>
            );
        }

        // Bold: **text**
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return (
                <strong key={index} className="font-semibold text-gray-950 dark:text-white">
                    {part.slice(2, -2)}
                </strong>
            );
        }

        // Inline Code: `code`
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
            return (
                <code
                    key={index}
                    className="rounded bg-purple-100/80 px-1.5 py-0.5 font-mono text-[11px] text-purple-800 border border-purple-200/50 dark:border-purple-800/40 dark:bg-purple-950/70 dark:text-purple-300"
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
                <em key={index} className="italic text-gray-700 dark:text-gray-300">
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
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600 dark:bg-purple-400" />
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
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
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
                    className="my-2.5 border-0 border-t border-gray-200/80 dark:border-white/10"
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
                    className={`font-semibold text-gray-950 dark:text-white ${
                        level === 1
                            ? 'mt-3 mb-1 text-base font-bold'
                            : level === 2
                              ? 'mt-2.5 mb-1 text-sm font-bold text-purple-900 dark:text-purple-200'
                              : 'mt-2 mb-0.5 text-[13px] font-semibold text-purple-900 dark:text-purple-300'
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
            <p key={`p-${lineIdx}`} className="text-[13px] leading-relaxed text-gray-800 dark:text-gray-100">
                {renderInlineContent(trimmed)}
            </p>
        );
    });

    flushList();

    return <div className="space-y-1">{renderedNodes}</div>;
}

export default function Chatbot({ isDarkMode: _isDarkMode }: { isDarkMode?: boolean } = {}) {
    void _isDarkMode;
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            inputRef.current?.focus();
        }
    }, [isOpen, messages]);

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

        try {
            const apiMessages = updatedHistory.map((m) => ({
                role: m.role,
                text: m.text,
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const data = await res.json();

            if (data.success && data.reply) {
                const botMsg: Message = {
                    id: generateId('bot'),
                    role: 'model',
                    text: data.reply,
                    timestamp: 'Just now',
                };
                setMessages((prev) => [...prev, botMsg]);
            } else {
                throw new Error(data.message || 'Failed to receive response');
            }
        } catch (err) {
            console.error('Chat error:', err);
            const errorMsg: Message = {
                id: generateId('error'),
                role: 'model',
                text: 'Sorry, I could not process your request right now. Feel free to email Abdulahad directly at [abdulahadhussain60@gmail.com](mailto:abdulahadhussain60@gmail.com).',
                timestamp: 'Just now',
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        setMessages([
            {
                id: generateId('reset'),
                role: 'model',
                text: "✨ Conversation cleared! What would you like to know about Abdulahad's work?",
                timestamp: 'Just now',
            },
        ]);
    };

    return (
        <aside aria-label="AI Assistant" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <section
                    aria-label="Jinny Portfolio AI Chatbot"
                    className="mb-3 flex h-[540px] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-gray-200/90 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:w-[400px] dark:border-white/15 dark:bg-[#11001f]/95 dark:shadow-[0_15px_45px_rgba(0,0,0,0.85)]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-purple-100/50 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 px-4.5 py-3.5 text-white shadow-sm dark:border-white/10 dark:from-[#2a004a] dark:via-[#1a0033] dark:to-[#11001f]">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-md shadow-inner">
                                <JinnyIcon className="text-2xl" />
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-purple-800 bg-emerald-400 dark:border-[#11001f]" />
                            </div>
                            <div>
                                <h3 className="font-Ovo text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                                    Jinny
                                    <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[9px] font-sans font-medium tracking-normal text-purple-100">
                                        AI
                                    </span>
                                </h3>
                                <p className="text-[11px] font-light text-purple-100/80 flex items-center gap-1.5">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Portfolio Assistant
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={handleClearChat}
                                title="Clear conversation"
                                className="rounded-xl p-1.5 text-purple-100 transition hover:bg-white/15 hover:text-white cursor-pointer"
                                aria-label="Clear chat"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-xl p-1.5 text-purple-100 transition hover:bg-white/15 hover:text-white cursor-pointer"
                                aria-label="Close chat"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 text-sm">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'model' && (
                                    <div className="mt-0.5 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-xl bg-purple-100/90 dark:bg-[#2a004a]/90 ring-1 ring-purple-200/50 dark:ring-white/10 shadow-xs">
                                        <JinnyIcon className="text-base" />
                                    </div>
                                )}

                                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                                    <div
                                        className={`rounded-2xl px-4 py-3 shadow-xs ${
                                            msg.role === 'user'
                                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs shadow-purple-500/20 shadow-md dark:from-purple-700 dark:to-indigo-800'
                                                : 'bg-rose-50/70 border border-purple-100/80 text-gray-800 rounded-tl-xs dark:bg-[#1f0038]/70 dark:border-white/10 dark:text-gray-100'
                                        }`}
                                    >
                                        {msg.role === 'user' ? (
                                            <p className="text-[13px] leading-relaxed break-words font-medium">{msg.text}</p>
                                        ) : (
                                            <FormattedMarkdown content={msg.text} />
                                        )}
                                    </div>
                                    <span className="mt-1 px-1.5 text-[10px] text-gray-400 dark:text-gray-500">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-xl bg-purple-100/90 dark:bg-[#2a004a]/90 ring-1 ring-purple-200/50 dark:ring-white/10 shadow-xs">
                                    <JinnyIcon className="text-base" />
                                </div>
                                <div className="flex items-center gap-2 rounded-2xl bg-rose-50/70 border border-purple-100/80 px-4 py-3 text-purple-700 dark:bg-[#1f0038]/70 dark:border-white/10 dark:text-purple-300">
                                    <span className="text-xs font-medium">Jinny is thinking</span>
                                    <span className="flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-600 dark:bg-purple-400 [animation-delay:-0.3s]" />
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-600 dark:bg-purple-400 [animation-delay:-0.15s]" />
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-600 dark:bg-purple-400" />
                                    </span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    <div className="border-t border-gray-100/80 bg-gray-50/60 px-3 py-2 dark:border-white/10 dark:bg-[#1a0033]/40">
                        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[11px]">
                            {QUICK_PROMPTS.map((qp, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSendMessage(qp.prompt)}
                                    disabled={isLoading}
                                    className="shrink-0 rounded-full border border-purple-200/70 bg-white/90 px-3 py-1.5 font-medium text-gray-700 shadow-xs transition hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 dark:border-white/15 dark:bg-[#2a004a]/70 dark:text-gray-200 dark:hover:border-purple-400 dark:hover:bg-[#3b0066] dark:hover:text-white cursor-pointer disabled:opacity-50"
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
                        className="flex items-center gap-2 border-t border-gray-100 bg-white p-3 dark:border-white/10 dark:bg-[#11001f]"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask Jinny about skills, projects, experience..."
                            disabled={isLoading}
                            className="flex-1 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 text-xs text-gray-900 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 dark:border-white/15 dark:bg-[#1f0038]/60 dark:text-white dark:focus:border-purple-400 dark:focus:bg-[#11001f]"
                            maxLength={300}
                        />
                        <button
                            type="submit"
                            disabled={!inputMessage.trim() || isLoading}
                            aria-label="Send prompt to Jinny"
                            className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 transition hover:from-purple-700 hover:to-indigo-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <svg className="h-4 w-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </section>
            )}

            {/* Launcher Button & Teaser */}
            <div className="flex items-center gap-2.5">
                {!isOpen && hasUnread && (
                    <div
                        onClick={handleOpenChat}
                        className="hidden sm:flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/95 px-4 py-1.5 text-xs font-medium text-purple-800 shadow-xl backdrop-blur-md cursor-pointer transition hover:scale-105 dark:border-white/20 dark:bg-[#1f0038]/95 dark:text-purple-200"
                    >
                        <span>👻 Ask Jinny</span>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleToggleChat}
                    aria-label={isOpen ? 'Close Jinny AI Assistant' : 'Open Jinny AI Assistant'}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ring-4 ring-purple-400/30 cursor-pointer dark:ring-purple-600/30 text-2xl"
                >
                    {isOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <div className="relative flex items-center justify-center w-full h-full">
                            <JinnyIcon className="text-2xl" />
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-purple-600 bg-emerald-500" />
                            </span>
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}
