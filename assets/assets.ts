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
    responsibilities?: string[];
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
        featured: true,
        title: 'WealthSync',
        type: 'Full Stack Project',
        kind: 'personal',
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
    // Client work, built and run at BitLogicx.
    {
        slug: 'ola-lssu',
        featured: true,
        title: 'OLA LSSU',
        type: 'Training & Certification Platform',
        kind: 'client',
        summary:
            'The training and certification portal for the Logistics Sector Skills Unit of the Oman Logistics Association.',
        overview: [
            'LSSU (Logistics Sector Skills Unit) is the skills body of the Oman Logistics Association. Its platform is where candidates and organisations across Oman’s logistics sector find trainings and assessments, enrol, get certified and prove it.',
            'Employers and the public can verify a learner or a certificate online, and training providers can apply to become partners. The site runs in English and Arabic.',
        ],
        features: [
            'Training and assessment catalogue with search and categories',
            'Sign up as a candidate or as an organisation',
            'Certificate and learner verification portals',
            'Training partner onboarding',
            'Governance, media, services and occupational standards pages',
            'English and Arabic (RTL) support',
        ],
        responsibilities: [
            'Built frontend screens and the APIs behind them',
            'Set up CI/CD pipelines for automated deployments',
            'Configured the Ubuntu and Nginx production servers',
            'Performance optimisation and ongoing maintenance',
        ],
        stack: ['Nuxt', 'Vue', 'Node.js', 'Nginx', 'Ubuntu'],
        role: 'Full stack developer at BitLogicx',
        url: 'https://lssu.ola.om/',
        bgImage: '/work/ola-lssu.jpg',
    },
    {
        slug: 'opal-sip',
        featured: true,
        title: 'OPAL SIP',
        type: 'Multi-tenant Platform',
        kind: 'client',
        summary:
            'A Smart Integrated Platform that brings training, inspection, vehicle monitoring and journey management for Oman’s energy sector into one system.',
        overview: [
            'SIP (Smart Integrated Platform) is a multi-tenant system for OPAL, the Oman Energy Association. It replaces separate tools with one portal for organisations, drivers, training providers, IVMS vendors and administrators.',
            'Each role gets its own workspace: providers run training and certification, inspectors record technical inspections, and operators plan safe journeys and monitor in-vehicle systems, with a public portal to verify records.',
        ],
        features: [
            'Training enrolment, assessment and certificate issuing',
            'Technical inspection scheduling and compliance records',
            'IVMS vendor onboarding and monitoring',
            'Safe journey management: routes, risk assessment and approvals',
            'Traffic insight and incident data',
            'Role-based portals and a public verification portal',
            'English and Arabic support',
        ],
        responsibilities: [
            'Built multi-tenant frontend modules and REST APIs',
            'Implemented role-based access for each user type',
            'Set up CI/CD and the Ubuntu and Nginx deployment servers',
            'Optimisation, monitoring and maintenance in production',
        ],
        stack: ['Nuxt', 'Vue', 'Node.js', 'Nginx', 'Ubuntu'],
        role: 'Full stack developer at BitLogicx',
        url: 'https://sip.opaloman.om/',
        bgImage: '/work/opal-sip.jpg',
    },
    {
        slug: 'information-commission-gambia',
        featured: true,
        title: 'Information Commission Gambia',
        type: 'Government Platform',
        kind: 'client',
        summary:
            'The official platform of The Gambia’s Information Commission, where citizens request public information and file complaints.',
        overview: [
            'The Information Commission is the independent statutory body set up under The Gambia’s Access to Information Act, 2021. Its platform lets citizens request information from public institutions, file complaints when access is denied, and follow the commission’s decisions.',
            'It also publishes a searchable document repository, case decisions, news and the commissioners’ profiles, in English, French and Arabic.',
        ],
        features: [
            'Online information request and complaint forms',
            'Institutional compliance tracking',
            'Searchable public document repository',
            'Case decisions, news and resources',
            'Commissioners and officers directory',
            'English, French and Arabic',
        ],
        responsibilities: [
            'Built the Next.js frontend and the backend APIs',
            'Set up CI/CD pipelines and the production server',
            'Configured Nginx on Ubuntu for deployment',
            'Performance tuning and ongoing maintenance',
        ],
        stack: ['Next.js', 'React', 'Node.js', 'Nginx', 'Ubuntu'],
        role: 'Full stack developer at BitLogicx',
        url: 'https://informationcommission.gm/',
        bgImage: '/work/information-commission-gambia.jpg',
    },
    {
        slug: 'cliqbot',
        title: 'CliqBot',
        type: 'AI Assistant · Dashboard · Mobile App',
        kind: 'client',
        summary:
            'An AI assistant inside Zoho Cliq for Home Doctor USA, with an admin dashboard and a mobile app for doctors.',
        overview: [
            'CliqBot is an AI assistant that lives in Home Doctor USA’s Zoho Cliq workspace. It reads incoming messages and uploaded files, including scanned documents through OCR, and answers using retrieval-augmented generation over a memory of approved doctor responses.',
            'Doctors review and approve answers from a Flutter mobile app with push notifications, and administrators manage everything from a web dashboard: usage and queue health, conversations, approvals, the embedding pipeline and AI provider settings.',
        ],
        features: [
            'Zoho Cliq bot with webhooks, channels and file handling',
            'Multiple AI providers: OpenAI, Anthropic, Gemini and local Ollama models',
            'RAG memory with pgvector embeddings of approved doctor answers',
            'OCR for images and PDFs with Tesseract, Google Vision or AWS Textract',
            'Doctor approval flow in a Flutter app with Firebase push notifications',
            'Admin dashboard with token usage, queue health and review queues',
            'Background jobs and retries with BullMQ and Redis',
        ],
        responsibilities: [
            'Built backend APIs and queue workers in AdonisJS',
            'Built admin dashboard features in Vue',
            'Worked on the Flutter mobile app for doctors',
            'GitHub Actions CI/CD to DigitalOcean, plus APK release builds',
        ],
        stack: [
            'AdonisJS',
            'TypeScript',
            'PostgreSQL',
            'Redis',
            'Vue',
            'Tailwind CSS',
            'Flutter',
            'Firebase',
            'GitHub Actions',
            'DigitalOcean',
        ],
        role: 'Full stack developer at BitLogicx',
    },
    {
        slug: 'bitlogicx-website',
        title: 'BitLogicx Website',
        type: 'Company Website',
        kind: 'client',
        summary:
            'The website of BitLogicx, a software company in Lahore serving clients in Europe, the Middle East and the USA.',
        overview: [
            'The public website for BitLogicx Development. It presents the company’s services, its own products such as Dot HRM, BitERP and Restaurant POS, the industries it serves and its case studies.',
            'It is built to turn visitors into leads, with free consultation, demo request and hiring flows, plus careers and a blog.',
        ],
        features: [
            'Services, products and industries mega menus',
            'Case studies, careers and blog',
            'Consultation, demo request and hire flows',
            'Server-rendered, SEO-friendly pages behind Cloudflare',
            'Animated hero slider and responsive layout',
        ],
        responsibilities: [
            'Built and maintained pages and components in Nuxt',
            'Set up the CI/CD pipeline and deployment',
            'Performance and SEO optimisation',
        ],
        stack: ['Nuxt', 'Vue', 'Node.js', 'Cloudflare'],
        role: 'Full stack developer at BitLogicx',
        url: 'https://bitlogicx.com/',
        bgImage: '/work/bitlogicx-website.jpg',
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

export const educationData = {
    degree: 'B.Sc. Computer Science',
    school: 'University of Engineering and Technology (UET), Lahore',
    period: 'Class of 2026',
    location: 'Lahore, Pakistan',
    summary:
        'Built a strong foundation in software engineering, algorithms, databases, web development and problem solving, supported by practical full-stack and AI-based projects.',
    focus: [
        'Software Engineering',
        'Data Structures & Algorithms',
        'Databases',
        'Web Development',
        'Artificial Intelligence',
    ],
    project: {
        title: 'Zabaan-e-Kissan',
        label: 'Final year project',
        summary:
            'An AI-powered mobile assistant that lets farmers ask for agricultural help by voice, in Urdu or English.',
        highlights: [
            'Crop disease detection with AI treatment recommendations',
            'Voice interaction in Urdu and English',
            'Real-time market prices',
            'Weather-based crop suitability analysis',
        ],
        demo: {
            video: '/education/zabaan-e-kissan-demo.mp4',
            poster: '/education/zabaan-e-kissan-demo.jpg',
        },
        overview: [
            'Many farmers in Pakistan cannot easily read English apps or reach an agriculture expert in time. Zabaan-e-Kissan ("the farmer\'s language") puts that help on a phone: a farmer photographs a sick leaf, speaks a question in Urdu, or checks today\'s mandi rate, and gets an answer in their own language.',
            'The system has three parts: a React Native mobile app for farmers, a FastAPI backend that runs the AI models and data services, and a Next.js website for the project and app downloads. I worked across all three, from training the disease model to deploying the API.',
        ],
        parts: [
            {
                name: 'Mobile app',
                text: 'React Native with Expo Router. Tabs for scanning, AI chat, crop prices and settings, with offline history in SQLite, a map for field location, Urdu and English UI, and light and dark themes. Shipped as an Android APK through EAS builds.',
                repo: 'https://github.com/ABDULAHAD118/Zabaan-E-Kissan-App',
            },
            {
                name: 'Backend API',
                text: 'FastAPI service that serves the disease model, the chatbot over WebSockets, speech-to-text and the crop price endpoints, backed by MongoDB. Deployed to a DigitalOcean droplet by a GitHub Actions workflow on every push.',
                repo: 'https://github.com/ABDULAHAD118/Backend-Zabaan-E-Kissan',
            },
            {
                name: 'Website',
                text: 'Next.js site that introduces the project and lets farmers download the Android app from a QR code.',
                repo: 'https://github.com/ABDULAHAD118/Zabaan-E-Kissan-UI',
            },
        ],
        features: [
            {
                title: 'Crop disease detection',
                text: 'A Keras image model trained on 17 disease and healthy-leaf classes across wheat, rice, corn, potato and sugarcane. The farmer takes a photo or picks one from the gallery and gets the result in seconds.',
            },
            {
                title: 'Diagnosis report',
                text: 'Each scan shows the disease, a confidence score, how severe it is, recommended treatment and prevention tips, with a button to ask the chatbot follow-up questions about that scan.',
            },
            {
                title: 'Scan history',
                text: 'Recent scans are saved on the phone with SQLite, so a farmer can look back at earlier results without internet. They can be cleared from settings.',
            },
            {
                title: 'Urdu and English AI chat',
                text: 'A farming assistant built with LangGraph and LangChain that streams answers in real time over a WebSocket and keeps the conversation context.',
            },
            {
                title: 'Voice questions',
                text: "Speech is transcribed with OpenAI Whisper in Urdu, English or Punjabi, so farmers who don't type can just ask.",
            },
            {
                title: 'Answers read aloud',
                text: 'Chat replies can be played back with text-to-speech in the selected language, for farmers who find reading hard.',
            },
            {
                title: 'Live crop prices',
                text: 'A Selenium scraper collects daily market rates into MongoDB. The app searches by crop or city, filters by city, compares cities side by side and refreshes with a pull.',
            },
            {
                title: 'Price trends',
                text: 'A detail screen for each crop shows minimum and maximum price, price history and the trend, and the price can be shared with others.',
            },
            {
                title: 'Field analysis',
                text: "From the field's GPS location (checked against Pakistan's boundary), remote sensing and weather data suggest which crops suit the land.",
            },
            {
                title: 'Bilingual, themed app',
                text: 'The whole interface switches between Urdu and English with i18next, and has light and dark themes.',
            },
        ],
        stack: [
            'React Native',
            'Expo',
            'TypeScript',
            'FastAPI',
            'Python',
            'TensorFlow',
            'Keras',
            'LangChain',
            'MongoDB',
            'Selenium',
            'Next.js',
            'GitHub Actions',
            'DigitalOcean',
        ],
    },
};

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
        projects: ['opal-sip', 'ola-lssu', 'cliqbot', 'wealthsync'],
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
        projects: ['cliqbot', 'opal-sip', 'url-shortener'],
    },
    {
        icon: assets.mobile_icon,
        slug: 'mobile-app',
        title: 'Mobile App',
        description:
            'Cross-platform mobile experiences using React Native, API integrations, and user-focused interaction design.',
        intro: 'Cross-platform mobile apps from one codebase, connected to your API and designed around how people use their phones.',
        deliverables: [
            'React Native and Flutter apps for iOS and Android',
            'API integration',
            'Device features such as location',
            'Navigation and app structure',
            'Store-ready builds with Expo',
        ],
        stack: ['React Native', 'Expo', 'Flutter', 'Firebase', 'TypeScript'],
        projects: ['cliqbot', 'weather-app'],
    },
    {
        icon: assets.ui_icon,
        slug: 'devops',
        title: 'DevOps & Deployment',
        description:
            'CI/CD pipelines, Linux servers, Docker, Nginx and SSL, so every push reaches production safely.',
        intro: 'I set up the servers and pipelines that take code from a git push to a live, secure site, and keep it running.',
        deliverables: [
            'CI/CD pipelines with GitHub Actions',
            'Ubuntu server setup on DigitalOcean or a VPS',
            'Nginx reverse proxy, domains and SSL',
            'Docker and PM2 process management',
            'Zero-downtime deploys and rollbacks',
        ],
        stack: [
            'GitHub Actions',
            'Docker',
            'Nginx',
            'Ubuntu',
            'DigitalOcean',
            'PM2',
            "Let's Encrypt",
            'Cloudflare',
        ],
        projects: ['ola-lssu', 'opal-sip', 'cliqbot', 'bitlogicx-website'],
    },
    {
        icon: assets.ui_icon,
        slug: 'ai-integration',
        title: 'AI Integration',
        description:
            'Chatbots, image models and speech-to-text added to your product with LLM APIs and LangChain.',
        intro: 'I add AI features that solve a real problem in your product, from a chatbot that knows your content to image and voice models.',
        deliverables: [
            'LLM chatbots trained on your own content',
            'LangChain and LangGraph agent workflows',
            'Image classification models with TensorFlow',
            'Speech-to-text and text-to-speech',
            'Streaming responses over WebSockets',
        ],
        stack: [
            'Google Gemini',
            'LangChain',
            'TensorFlow',
            'Keras',
            'FastAPI',
            'Python',
        ],
        projects: [],
    },
    {
        icon: assets.web_icon,
        slug: 'dashboards',
        title: 'Dashboards & Admin Panels',
        description:
            'Admin panels and dashboards with roles, charts, tables and reports to run the business behind an app.',
        intro: 'The internal tools that run your product: managing users and content, tracking numbers and handling day-to-day operations.',
        deliverables: [
            'Role-based admin panels',
            'Charts, KPIs and reports',
            'Data tables with search, filters and export',
            'Content and user management',
            'Notifications and activity logs',
        ],
        stack: ['Vue', 'Nuxt', 'React', 'Chart.js', 'Tailwind CSS', 'AdonisJS'],
        projects: ['cliqbot', 'opal-sip', 'wealthsync'],
    },
    {
        icon: assets.web_icon,
        slug: 'maintenance',
        title: 'Performance & Maintenance',
        description:
            'Speed audits, Core Web Vitals, bug fixes, upgrades and ongoing support for live apps.',
        intro: 'I keep existing apps fast, secure and up to date, so the product keeps working after launch.',
        deliverables: [
            'Performance audits and Core Web Vitals fixes',
            'API and database query optimisation',
            'Bug fixing and dependency upgrades',
            'Error monitoring and uptime checks',
            'Monthly support and small features',
        ],
        stack: ['Lighthouse', 'Sentry', 'Redis', 'Cloudflare', 'Node.js'],
        projects: [
            'ola-lssu',
            'information-commission-gambia',
            'bitlogicx-website',
        ],
    },
    {
        icon: assets.web_icon,
        slug: 'saas',
        title: 'SaaS Development',
        description:
            'Multi-tenant SaaS platforms with user roles, subscriptions, dashboards and APIs, built to grow with your customers.',
        intro: 'I build software-as-a-service products where many organisations share one platform, each with its own users, data and settings.',
        deliverables: [
            'Multi-tenant architecture with data separation',
            'Sign-up, onboarding and role-based access',
            'Subscription plans and billing',
            'Customer and admin dashboards',
            'Scalable APIs, CI/CD and cloud hosting',
        ],
        stack: [
            'Next.js',
            'Vue',
            'Nuxt',
            'Node.js',
            'AdonisJS',
            'MySQL',
            'Redis',
            'Stripe',
        ],
        projects: ['opal-sip', 'cliqbot', 'wealthsync'],
    },
    {
        icon: assets.web_icon,
        slug: 'cms',
        title: 'CMS Development',
        description:
            'Custom content management systems so your team can publish pages, news, documents and media without a developer.',
        intro: 'A content system shaped around your organisation, so editors can update the site themselves while it stays fast and search-friendly.',
        deliverables: [
            'Custom admin panel for pages, news and media',
            'Document libraries with search and filters',
            'Roles and approval for editors',
            'Multi-language content',
            'SEO fields, sitemaps and fast page loads',
        ],
        stack: [
            'Next.js',
            'Nuxt',
            'Node.js',
            'MySQL',
            'MongoDB',
            'Tailwind CSS',
        ],
        projects: ['information-commission-gambia', 'bitlogicx-website'],
    },
    {
        icon: assets.web_icon,
        slug: 'ecommerce',
        title: 'E-commerce & Ordering',
        description:
            'Online stores and ordering systems with catalogues, carts, checkout, order tracking and an admin panel.',
        intro: 'Shops and ordering apps that make it easy to browse, buy and track an order, with the back office to run it.',
        deliverables: [
            'Product or menu catalogue with search',
            'Cart, checkout and online payments',
            'Order tracking for customers',
            'Admin panel for products, orders and stock',
            'Email notifications and receipts',
        ],
        stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        projects: ['bite-savor'],
    },
    {
        icon: assets.ui_icon,
        slug: 'api-integrations',
        title: 'API & Third-party Integrations',
        description:
            'Connect your product to payment gateways, chat platforms, maps, email, SMS and AI services.',
        intro: 'I connect your app to the services it depends on, with secure authentication, webhooks and error handling that copes when the other side fails.',
        deliverables: [
            'Payment gateway integration',
            'Chat platforms and bots such as Zoho Cliq',
            'OAuth and single sign-on',
            'Webhooks and background jobs',
            'Email, SMS and push notifications',
        ],
        stack: [
            'Node.js',
            'AdonisJS',
            'Redis',
            'Firebase',
            'Postman',
            'Stripe',
        ],
        projects: ['cliqbot', 'opal-sip', 'weather-app'],
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
