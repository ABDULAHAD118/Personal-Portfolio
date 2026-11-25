import * as si from 'simple-icons';
import { assets } from '@/assets/assets';
import { linkedinIcon, type TechIconSource } from '@/app/components/ui/TechIcon';

// Section text and data for the redesigned portfolio. Grows as each section is rebuilt.

export const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
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
    ['React', 'Next.js', 'Vue', 'Node.js', 'TypeScript'].includes(t.name),
);

export const socials = [
    { label: 'GitHub', href: 'https://github.com/ABDULAHAD118', icon: si.siGithub },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdulahad018/', icon: linkedinIcon },
    { label: 'Instagram', href: 'https://www.instagram.com/abdulahadhussain8/', icon: si.siInstagram },
];
