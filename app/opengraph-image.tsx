import { ImageResponse } from 'next/og';
import { siteConfig } from './lib/site-config';

export const alt = `${siteConfig.name} - ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        <div
            style={{
                alignItems: 'center',
                background:
                    'linear-gradient(135deg, #11001f 0%, #2a004a 55%, #7e22ce 100%)',
                color: 'white',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                padding: '72px',
                width: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '1000px',
                }}
            >
                <div
                    style={{
                        color: '#e9d5ff',
                        display: 'flex',
                        fontSize: 30,
                        letterSpacing: 5,
                        marginBottom: 28,
                        textTransform: 'uppercase',
                    }}
                >
                    Official Portfolio · Lahore, Pakistan
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 78,
                        fontWeight: 700,
                        lineHeight: 1.05,
                    }}
                >
                    {siteConfig.name}
                </div>
                <div
                    style={{
                        color: '#f3e8ff',
                        display: 'flex',
                        fontSize: 43,
                        marginTop: 24,
                    }}
                >
                    {siteConfig.role}
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 25,
                        gap: 20,
                        marginTop: 42,
                    }}
                >
                    React · Next.js · Vue · Node.js · TypeScript · Software Engineering
                </div>
            </div>
        </div>,
        size,
    );
}
