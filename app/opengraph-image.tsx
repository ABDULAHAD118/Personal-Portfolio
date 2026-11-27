import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
import { siteConfig } from './lib/site-config';

export const alt = `${siteConfig.name} - ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Same palette as the site's dark theme.
const bg = '#0b1324';
const panel = '#111b31';
const fg = '#e6ebf5';
const muted = '#8d9ab3';
const accent = '#ff7a6b';
const line = 'rgba(237, 232, 222, 0.09)';

export default function OpenGraphImage() {
    let photo: string;
    try {
        const file = fs.readFileSync(
            path.join(process.cwd(), 'public', 'abdulahad-hussain.png')
        );
        photo = `data:image/png;base64,${file.toString('base64')}`;
    } catch {
        photo = `${siteConfig.url}/abdulahad-hussain.png`;
    }

    return new ImageResponse(
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                background: bg,
                backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
                backgroundSize: '64px 64px',
                color: fg,
                fontFamily: 'sans-serif',
                padding: '0 0 0 80px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: muted,
                        fontSize: 24,
                        fontFamily: 'monospace',
                    }}
                >
                    {'// full stack software engineer'}
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#4ade80',
                            marginLeft: 18,
                        }}
                    >
                        ● open to work
                    </span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: 104,
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: '-3px',
                        marginTop: 28,
                    }}
                >
                    <span>{siteConfig.givenName}</span>
                    <span style={{ display: 'flex', alignItems: 'flex-end' }}>
                        {siteConfig.familyName}
                        <span
                            style={{
                                width: 30,
                                height: 84,
                                background: accent,
                                marginLeft: 12,
                                marginBottom: 6,
                            }}
                        />
                    </span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        color: muted,
                        fontSize: 28,
                        marginTop: 32,
                    }}
                >
                    React · Next.js · Vue · Node.js · TypeScript
                </div>
                <div
                    style={{
                        display: 'flex',
                        color: accent,
                        fontSize: 24,
                        fontFamily: 'monospace',
                        marginTop: 40,
                    }}
                >
                    {siteConfig.domain} · Lahore, Pakistan
                </div>
            </div>

            {/* Cut-out portrait on a panel with a warm glow, like the hero */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    width: 440,
                    height: '100%',
                    background: panel,
                    backgroundImage: `radial-gradient(ellipse 70% 50% at 50% 32%, rgba(255, 138, 61, 0.28), transparent 70%)`,
                    borderLeft: `1px solid ${line}`,
                }}
            >
                { }
                <img
                    src={photo}
                    alt={siteConfig.name}
                    width={450}
                    height={600}
                    // Mirrored so he faces the text, same as the hero.
                    style={{ width: 450, height: 600, transform: 'scaleX(-1)' }}
                />
            </div>
        </div>,
        size
    );
}
