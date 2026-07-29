import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
import { siteConfig } from './lib/site-config';

export const alt = `${siteConfig.name} - ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    let profileImageData: string;
    try {
        const filePath = path.join(process.cwd(), 'public', 'abdulahad-hussain.png');
        const fileBuffer = fs.readFileSync(filePath);
        profileImageData = `data:image/png;base64,${fileBuffer.toString('base64')}`;
    } catch {
        profileImageData = `${siteConfig.url}/abdulahad-hussain.png`;
    }

    return new ImageResponse(
        (
            <div
                style={{
                    alignItems: 'center',
                    background:
                        'linear-gradient(135deg, #090014 0%, #1c0533 45%, #3b0764 80%, #581c87 100%)',
                    color: 'white',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'space-between',
                    padding: '60px 80px',
                    width: '100%',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        maxWidth: '680px',
                    }}
                >
                    <div
                        style={{
                            color: '#c084fc',
                            display: 'flex',
                            fontSize: 22,
                            fontWeight: 600,
                            letterSpacing: 4,
                            marginBottom: 20,
                            textTransform: 'uppercase',
                        }}
                    >
                        Official Portfolio · Lahore, Pakistan
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 64,
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: '-1px',
                            color: '#ffffff',
                        }}
                    >
                        {siteConfig.name}
                    </div>
                    <div
                        style={{
                            color: '#e9d5ff',
                            display: 'flex',
                            fontSize: 34,
                            fontWeight: 500,
                            marginTop: 16,
                        }}
                    >
                        {siteConfig.role}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px 16px',
                            marginTop: 36,
                            color: '#d8b4fe',
                            fontSize: 20,
                        }}
                    >
                        React · Next.js · Vue · Node.js · TypeScript
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 320,
                            height: 320,
                            borderRadius: 160,
                            background:
                                'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                            padding: 6,
                            boxShadow: '0 0 50px rgba(168, 85, 247, 0.4)',
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={profileImageData}
                            alt={siteConfig.name}
                            width={308}
                            height={308}
                            style={{
                                width: 308,
                                height: 308,
                                borderRadius: 154,
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>
            </div>
        ),
        size,
    );
}

