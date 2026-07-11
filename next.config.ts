import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.abdulahadhussain.tech',
                    },
                ],
                destination: 'https://abdulahadhussain.tech/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
