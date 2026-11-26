import * as si from 'simple-icons';
import { assets } from '@/assets/assets';
import {
    linkedinIcon,
    type TechIconSource,
} from '@/app/components/ui/TechIcon';

// Section text and data for the redesigned portfolio. Grows as each section is rebuilt.

export const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Experience', href: '/experience' },
    { label: 'Education', href: '/education' },
    { label: 'Services', href: '/services' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Contact', href: '/contact' },
];

export const techStack: { name: string; icon: TechIconSource }[] = [
    { name: 'TypeScript', icon: si.siTypescript },
    { name: 'JavaScript', icon: si.siJavascript },
    { name: 'Python', icon: si.siPython },
    { name: 'C++', icon: si.siCplusplus },
    { name: 'React', icon: si.siReact },
    { name: 'Next.js', icon: si.siNextdotjs },
    { name: 'Vue', icon: si.siVuedotjs },
    { name: 'Nuxt', icon: si.siNuxt },
    { name: 'Node.js', icon: si.siNodedotjs },
    { name: 'AdonisJS', icon: si.siAdonisjs },
    { name: 'MongoDB', icon: si.siMongodb },
    { name: 'MySQL', icon: si.siMysql },
    { name: 'Redis', icon: si.siRedis },
    { name: 'Docker', icon: si.siDocker },
    { name: 'JWT', icon: si.siJsonwebtokens },
    { name: 'Git', icon: si.siGit },
    { name: 'GitHub', icon: si.siGithub },
    { name: 'Vercel', icon: si.siVercel },
    { name: 'Vite', icon: si.siVite },
    { name: 'npm', icon: si.siNpm },
    { name: 'Figma', icon: si.siFigma },
    { name: 'Postman', icon: si.siPostman },
    { name: 'Apidog', icon: assets.apidog },
    { name: 'VS Code', icon: assets.vscode },
    { name: 'WebStorm', icon: si.siWebstorm },
    { name: 'PyCharm', icon: si.siPycharm },
];

// Shown as tags in the hero.
export const heroStack = techStack.filter((t) =>
    ['React', 'Next.js', 'Vue', 'Node.js', 'TypeScript'].includes(t.name)
);

export const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/ABDULAHAD118',
        icon: si.siGithub,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/abdulahad018/',
        icon: linkedinIcon,
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/abdulahadhussain8/',
        icon: si.siInstagram,
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/923071390118',
        icon: si.siWhatsapp,
    },
];

// Icon lookup for the stack tags on detail pages; names without an icon render as plain text.
export const stackIcons: Record<string, TechIconSource> = {
    ...Object.fromEntries(techStack.map((t) => [t.name, t.icon])),
    Express: si.siExpress,
    'Tailwind CSS': si.siTailwindcss,
    'React Native': si.siReact,
    Expo: si.siExpo,
    EJS: si.siEjs,
    Axios: si.siAxios,
    HTML: si.siHtml5,
    CSS: si.siCss,
    Bootstrap: si.siBootstrap,
    Nginx: si.siNginx,
    Ubuntu: si.siUbuntu,
    PostgreSQL: si.siPostgresql,
    Flutter: si.siFlutter,
    Firebase: si.siFirebase,
    'GitHub Actions': si.siGithubactions,
    DigitalOcean: si.siDigitalocean,
    Cloudflare: si.siCloudflare,
    FastAPI: si.siFastapi,
    TensorFlow: si.siTensorflow,
    Keras: si.siKeras,
    LangChain: si.siLangchain,
    Selenium: si.siSelenium,
    PM2: si.siPm2,
    "Let's Encrypt": si.siLetsencrypt,
    'Google Gemini': si.siGooglegemini,
    'Chart.js': si.siChartdotjs,
    Lighthouse: si.siLighthouse,
    Sentry: si.siSentry,
    Stripe: si.siStripe,
};

// How a typical engagement runs; shown on the services pages.
export const workProcess = [
    {
        step: 'discover',
        text: 'A short call to understand the goal, users, constraints and timeline.',
    },
    {
        step: 'plan',
        text: 'A written scope with the data model, screens, milestones and estimate.',
    },
    {
        step: 'build',
        text: 'Weekly demos on a live preview so you see progress, not promises.',
    },
    {
        step: 'ship',
        text: 'Deployment, monitoring and handover, with support after launch.',
    },
];
