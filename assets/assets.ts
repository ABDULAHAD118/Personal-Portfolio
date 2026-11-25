import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import github from './github.png';
import figma from './figma.png';
import vite from './vite.png';
import npm from './npm.png';
import vercel from './vercel.svg';
import postman from './postman.png';
import git from './git.png';
import mongodb from './mongodb.png';
import webstorm from './webstorm.svg';
import pycharm from './pycharm.svg';
import apidog from './apidog.ico';
import docker from './docker.svg';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import linkedin_icon from './InBug-Black.png';
import linkedin_icon_dark from './InBug-White.png';
import instagram_icon from './Instagram_Glyph_Black.png';
import instagram_icon_dark from './Instagram_Glyph_White.png';
export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    vite,
    npm,
    vercel,
    firebase,
    figma,
    git,
    github,
    postman,
    mongodb,
    webstorm,
    pycharm,
    apidog,
    docker,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    linkedin_icon,
    linkedin_icon_dark,
    instagram_icon,
    instagram_icon_dark,
};

export type Project = {
    slug: string;
    title: string;
    type: string;
    kind: 'personal' | 'client';
    summary: string;
    overview: string[];
    features: string[];
    stack: string[];
    role: string;
    url?: string;
    repo?: string;
    bgImage?: string;
    featured?: boolean;
};

export const workData: Project[] = [
    {
        slug: 'bite-savor',
        title: 'Bite Savor',
        type: 'Full Stack Project',
        kind: 'personal',
        featured: true,
        summary:
            'A food delivery web app where users browse restaurants, place orders and track deliveries.',
        overview: [
            'Bite Savor is a full stack food delivery platform. Customers browse restaurants and menus, place orders and follow their delivery in real time.',
            'The codebase is split into three apps: a customer-facing frontend, an admin panel for managing the catalogue and orders, and a Node.js and Express backend backed by MongoDB.',
        ],
        features: [
            'Browse restaurants and menus',
            'Cart and order placement',
            'Real-time delivery tracking',
            'Separate admin panel for managing items and orders',
            'REST API backend with MongoDB storage',
        ],
        stack: ['React', 'Node.js', 'Express', 'MongoDB'],
        role: 'Solo developer: frontend, admin panel and API',
        bgImage: '/work-1.png',
        url: 'https://bitesavor.vercel.app/',
        repo: 'https://github.com/ABDULAHAD118/Bite-Savor-Food-Delivery',
    },
    {
        slug: 'wealthsync',
        title: 'WealthSync',
        type: 'Full Stack Project',
        kind: 'personal',
        featured: true,
        summary:
            'An expense tracker with budgets, charts and Excel and PDF exports.',
        overview: [
            'WealthSync helps people keep track of where their money goes. Users log expenses and income by category, set monthly budgets and see their spending as charts.',
            'It is a React and Vite frontend talking to a Node.js and Express REST API, with JWT authentication and MongoDB for storage, so the same data is available on any device.',
        ],
        features: [
            'Secure sign up and login with JWT',
            'Add, edit and delete expenses by category',
            'Monthly budgets with spending tracking',
            'Pie and bar charts of spending',
            'Export expenses and income to Excel or PDF',
            'Sync across devices',
        ],
        stack: [
            'React',
            'Vite',
            'Tailwind CSS',
            'Recharts',
            'Node.js',
            'Express',
            'MongoDB',
            'JWT',
        ],
        role: 'Solo developer: UI, API and data model',
        bgImage: '/work-2.png',
        url: 'https://wealthsync-expense-tracking-system.vercel.app/',
        repo: 'https://github.com/ABDULAHAD118/WealthSync-Expense-Tracking-System',
    },
    {
        slug: 'url-shortener',
        title: 'Url Shortener',
        type: 'Backend Project',
        kind: 'personal',
        featured: true,
        summary:
            'A Node.js service that turns long links into short ones and counts every visit.',
        overview: [
            'A small, fast URL shortener. Paste a long link, get a short one back, and see how many times each short link has been visited.',
            'Built with Express and Mongoose using an MVC layout (routes, controllers, models, views), nanoid for collision-resistant IDs and server-rendered EJS views, deployed on Vercel.',
        ],
        features: [
            'Shorten any URL from a simple form',
            'Unique short IDs generated with nanoid',
            'Redirect from the short link to the original URL',
            'Visit count tracked per link',
            'Table of previously shortened URLs',
        ],
        stack: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Vercel'],
        role: 'Solo developer',
        bgImage: '/work-3.png',
        url: 'https://myurlshort.vercel.app/',
        repo: 'https://github.com/ABDULAHAD118/URL-Shortener',
    },
    {
        slug: 'weather-app',
        title: 'Weather App',
        type: 'Mobile App',
        kind: 'personal',
        featured: true,
        summary:
            'A React Native app with live weather and a multi-day forecast for any location.',
        overview: [
            'A cross-platform mobile app that shows the current weather and a 5 to 7 day forecast for your location or any city you search for.',
            'Built with Expo and React Native, using expo-location for geolocation, tab navigation, NativeWind for styling and a UI that changes with the weather.',
        ],
        features: [
            'Current temperature and conditions',
            '5 to 7 day forecast',
            'Uses your device location',
            'Search weather for any city',
            'UI adapts to the current conditions',
            'Bottom tab navigation',
        ],
        stack: ['React Native', 'Expo', 'TypeScript', 'NativeWind', 'Axios'],
        role: 'Solo developer',
        bgImage: '/work-4.png',
        url: 'https://mega.nz/file/myJQgJ5B#iYi9wFctf4cXXrLMD2BLm4fwgEVdLmmxFlfgHQsp2P8',
        repo: 'https://github.com/ABDULAHAD118/Weather-App-Using-React-Native',
    },
    // Client work below uses placeholder text: replace with real details.
    {
        slug: 'ola-sip',
        title: 'OLA SIP',
        type: 'Client Project',
        kind: 'client',
        summary:
            'A client web platform built at BitLogicx, from data model to dashboard.',
        overview: [
            'OLA SIP is a client platform delivered with the BitLogicx team. I worked across the frontend and the API, building screens, endpoints and integrations.',
            'The focus was a fast, reliable dashboard with secure, role-based access to data.',
        ],
        features: [
            'Role-based dashboard for staff and admins',
            'REST API with JWT authentication',
            'Search, filters and pagination over large lists',
            'Containerised deployment with Docker',
        ],
        stack: ['Vue', 'Nuxt', 'AdonisJS', 'MySQL', 'Docker'],
        role: 'Full stack developer at BitLogicx',
    },
    {
        slug: 'stms',
        title: 'STMS',
        type: 'Client Project',
        kind: 'client',
        summary:
            'A management system for day-to-day operations, built for a BitLogicx client.',
        overview: [
            'STMS is an operations management system delivered at BitLogicx. It replaces spreadsheets with one place to create, assign and track records.',
            'I built API endpoints, database queries and frontend screens, with attention to performance on large data sets.',
        ],
        features: [
            'Create, assign and track records',
            'Role-based permissions',
            'Reports and summaries',
            'Optimised queries with Redis caching',
        ],
        stack: ['React', 'Node.js', 'MySQL', 'Redis'],
        role: 'Full stack developer at BitLogicx',
    },
    {
        slug: 'information-commission-gambia',
        title: 'Information Commission Gambia',
        type: 'Client Project',
        kind: 'client',
        summary:
            'A public website for the Information Commission of The Gambia.',
        overview: [
            'A public-facing website for the Information Commission of The Gambia, giving citizens access to news, publications and information about their right to information.',
            'Built with a content-managed backend so the commission’s staff can publish updates without a developer.',
        ],
        features: [
            'News and publications',
            'Information request guidance',
            'Admin area for publishing content',
            'Responsive, accessible pages',
        ],
        stack: ['Next.js', 'Node.js', 'MongoDB'],
        role: 'Full stack developer at BitLogicx',
    },
    {
        slug: 'cliqbot',
        title: 'CliqBot',
        type: 'Client Project',
        kind: 'client',
        summary:
            'A chatbot product that answers customer questions from a business’s own content.',
        overview: [
            'CliqBot is a chatbot product built at BitLogicx. Businesses add their content and get an assistant that answers customer questions on their site.',
            'I worked on the chat interface, the admin dashboard and the APIs that connect them.',
        ],
        features: [
            'Embeddable chat widget',
            'Admin dashboard to manage bots and content',
            'Conversation history',
            'Secure API with JWT authentication',
        ],
        stack: ['Next.js', 'Node.js', 'MongoDB', 'Redis'],
        role: 'Full stack developer at BitLogicx',
    },
    {
        slug: 'bitlogicx-website',
        title: 'BitLogicx Website',
        type: 'Client Project',
        kind: 'client',
        summary:
            'The company website for BitLogicx, a software development studio.',
        overview: [
            'The public website for BitLogicx, showing the studio’s services, work and team, and turning visitors into enquiries.',
            'Built for speed and search visibility, with server-rendered pages and a simple contact flow.',
        ],
        features: [
            'Services and portfolio pages',
            'Contact and enquiry form',
            'SEO-friendly server-rendered pages',
            'Responsive layout for every device',
        ],
        stack: ['Nuxt', 'Vue', 'Tailwind CSS'],
        role: 'Frontend developer at BitLogicx',
    },
];

export const experienceData = [
    {
        slug: 'bitlogicx',
        role: 'Full-Stack Web Developer',
        company: 'BitLogicx',
        period: 'June 2025 - Present',
        location: 'On-site · Lahore, Pakistan',
        summary:
            'Contributing to enterprise-grade frontend and backend systems using Vue, Nuxt, React, Next.js, Node.js, and AdonisJS.',
        highlights: [
            'Designed and optimized 15+ RESTful APIs, improving response performance by 30%.',
            'Implemented JWT authentication, role-based authorization, and scalable MongoDB, MySQL, and Redis integrations.',
            'Automated Docker-based CI/CD workflows, reducing deployment time by 40%.',
        ],
        stack: [
            'Vue',
            'Nuxt',
            'React',
            'Next.js',
            'Node.js',
            'AdonisJS',
            'MongoDB',
            'MySQL',
            'Redis',
            'Docker',
        ],
    },
    {
        slug: 'webdev-masters',
        role: 'Frontend Web Development Intern',
        company: 'WebDev Masters × ECC International',
        period: 'May 2024 - August 2024',
        location: 'Remote',
        summary:
            'Built responsive web interfaces and reusable components with HTML, CSS, JavaScript, React.js, and Bootstrap.',
        highlights: [
            'Improved interface consistency, maintainability, performance, and responsiveness across devices.',
            'Collaborated with mentors and team members on real-world frontend projects.',
            'Achieved 1st position among internship participants for performance and project delivery.',
        ],
        stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap'],
    },
];

export const professionalStats = [
    { value: '2+', label: 'Year Professional Experience' },
    { value: '15+', label: 'REST APIs Built' },
    { value: '30%', label: 'API Performance Improvement' },
    { value: '40%', label: 'Faster Deployments' },
];

export const certificateData = [
    {
        title: 'Full-Stack Development Internship',
        issuer: 'BitLogicx',
        date: 'June - September 2025',
        image: '/Certificates/bitlogicx-internship-preview.png',
        href: '/Certificates/A.%20Ahad%20EL.pdf',
    },
    {
        title: 'Frontend Web Development Internship',
        issuer: 'WebDev Masters × ECC International',
        date: 'May - August 2024',
        image: '/Certificates/Abdulahad%20Hussain%20Front%20End%20Internship.png',
        href: '/Certificates/Abdulahad%20Hussain%20Front%20End%20Internship.png',
    },
    {
        title: 'Become a Professional React Developer',
        issuer: 'Scrimba · Coursera',
        date: 'February 2025',
        image: '/Certificates/coursera-react-developer.png',
        href: '/Certificates/Coursera%20Become%20a%20Professional%20React%20Developer.pdf',
    },
    {
        title: 'Developing Back-End Apps with Node.js and Express',
        issuer: 'IBM · Coursera',
        date: 'January 2025',
        image: '/Certificates/coursera-node-express.png',
        href: '/Certificates/Coursera%20Developing%20Backend%20Apps%20With%20Nodejs%20and%20Express.pdf',
    },
    {
        title: 'Introduction to MongoDB',
        issuer: 'MongoDB · Coursera',
        date: 'August 2024',
        image: '/Certificates/coursera-mongodb.png',
        href: '/Certificates/Coursera%20Introduction%20to%20MongoDB.pdf',
    },
    {
        title: 'AI For Everyone',
        issuer: 'DeepLearning.AI · Coursera',
        date: 'January 2025',
        image: '/Certificates/coursera-ai-for-everyone.png',
        href: '/Certificates/Coursera%20AI%20for%20Everyone.pdf',
    },
    {
        title: 'Developing Front-End Apps with React',
        issuer: 'IBM · Coursera',
        date: 'February 2025',
        image: '/Certificates/coursera-frontend-react.png',
        href: '/Certificates/Coursera%20Developing%20Front-End%20Apps%20with%20React.pdf',
    },
    {
        title: 'JavaScript Programming Essentials',
        issuer: 'IBM · Coursera',
        date: 'January 2025',
        image: '/Certificates/coursera-javascript-essentials.png',
        href: '/Certificates/Coursera%20Javascript%20Essentials.pdf',
    },
    {
        title: 'Learn Advanced React',
        issuer: 'Scrimba · Coursera',
        date: 'February 2025',
        image: '/Certificates/coursera-advanced-react.png',
        href: '/Certificates/Coursera%20Learn%20Advanced%20React.pdf',
    },
    {
        title: 'Learn React',
        issuer: 'Scrimba · Coursera',
        date: 'October 2024',
        image: '/Certificates/coursera-learn-react.png',
        href: '/Certificates/Coursera%20Learn%20React%20Certificate.pdf',
    },
    {
        title: 'Introduction to Git and GitHub',
        issuer: 'Google · Coursera',
        date: 'January 2025',
        image: '/Certificates/coursera-git-github.png',
        href: '/Certificates/Coursera%20Introduction%20to%20Git%20%26%20GitHub.pdf',
    },
    {
        title: 'Programming with JavaScript',
        issuer: 'Meta · Coursera',
        date: 'July 2026',
        image: '/Certificates/coursera-programming-javascript.png',
        href: '/Certificates/Coursera%20Programming%20with%20JavaScript.pdf',
    },
];

export const serviceData = [
    {
        icon: assets.web_icon,
        slug: 'full-stack',
        title: 'Full Stack Developer',
        description:
            'End-to-end web applications with responsive interfaces, secure APIs, databases, testing, and production deployment.',
        intro: 'I take a product from an idea to a running app: the database, the API, the interface and the deployment, built to keep working as it grows.',
        deliverables: [
            'Data model and database design',
            'REST APIs with authentication and roles',
            'Responsive web frontend',
            'Docker-based deployment and CI/CD',
            'Handover docs and support',
        ],
        stack: [
            'Next.js',
            'React',
            'Vue',
            'Node.js',
            'AdonisJS',
            'MongoDB',
            'MySQL',
            'Docker',
        ],
        projects: ['bite-savor', 'wealthsync', 'ola-sip'],
    },
    {
        icon: assets.web_icon,
        slug: 'frontend',
        title: 'Frontend Developer',
        description:
            'Accessible, responsive interfaces built with React, Next.js, Vue, Nuxt, TypeScript, and modern CSS.',
        intro: 'Fast, accessible interfaces that look right on every screen and are easy for the next developer to work on.',
        deliverables: [
            'Pixel-accurate builds from Figma',
            'Reusable component libraries',
            'Responsive and accessible layouts',
            'API integration and state management',
            'Performance and SEO tuning',
        ],
        stack: [
            'React',
            'Next.js',
            'Vue',
            'Nuxt',
            'TypeScript',
            'Tailwind CSS',
            'Figma',
        ],
        projects: [
            'bitlogicx-website',
            'information-commission-gambia',
            'wealthsync',
        ],
    },
    {
        icon: assets.ui_icon,
        slug: 'backend',
        title: 'Backend Developer',
        description:
            'Scalable Node.js and AdonisJS services with REST APIs, JWT authorization, MySQL, MongoDB, and Redis.',
        intro: 'Secure, well-structured APIs and services that stay fast under load, with the data model to back them.',
        deliverables: [
            'REST API design and implementation',
            'JWT authentication and role-based access',
            'Database schema and query optimisation',
            'Caching with Redis',
            'Dockerised services and CI/CD',
        ],
        stack: [
            'Node.js',
            'AdonisJS',
            'Express',
            'MongoDB',
            'MySQL',
            'Redis',
            'Docker',
            'Postman',
        ],
        projects: ['url-shortener', 'stms', 'cliqbot'],
    },
    {
        icon: assets.mobile_icon,
        slug: 'mobile-app',
        title: 'Mobile App',
        description:
            'Cross-platform mobile experiences using React Native, API integrations, and user-focused interaction design.',
        intro: 'Cross-platform mobile apps from one codebase, connected to your API and designed around how people use their phones.',
        deliverables: [
            'React Native apps for iOS and Android',
            'API integration',
            'Device features such as location',
            'Navigation and app structure',
            'Store-ready builds with Expo',
        ],
        stack: ['React Native', 'Expo', 'TypeScript', 'NativeWind'],
        projects: ['weather-app'],
    },
];

export const infoList = [
    {
        icon: assets.code_icon,
        iconDark: assets.code_icon_dark,
        title: 'Languages',
        description:
            'TypeScript, JavaScript, Python, C++, SQL, React, Next.js, Vue, Nuxt, Node.js, AdonisJS',
    },
    {
        icon: assets.edu_icon,
        iconDark: assets.edu_icon_dark,
        title: 'Education',
        description: 'B.Sc. Computer Science · UET Lahore · Completed',
    },
    {
        icon: assets.project_icon,
        iconDark: assets.project_icon_dark,
        title: 'Projects',
        description: 'Built more than 10 projects',
    },
];
