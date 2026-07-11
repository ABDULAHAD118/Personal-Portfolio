import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Abdulahad Hussain | Full-Stack Web Developer',
        short_name: 'Abdulahad',
        description:
            'Portfolio of Abdulahad Hussain, a full-stack web developer in Lahore, Pakistan.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#11001f',
        lang: 'en',
        categories: ['portfolio', 'technology', 'developer'],
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
