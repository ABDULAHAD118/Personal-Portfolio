import type { NextConfig } from 'next';

const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://abdulahadhussain.tech'
).replace(/\/$/, '');

const nextConfig: NextConfig = {
    images: {
        // 90 is used for the portrait, where compression softness shows on faces.
        qualities: [75, 90],
    },
    // The old address is still indexed by Google; send it (and its ranking) to the real domain.
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'abdulahad-hussain.vercel.app' }],
                destination: `${siteUrl}/:path*`,
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
