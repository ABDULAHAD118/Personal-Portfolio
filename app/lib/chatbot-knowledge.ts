import {
    certificateData,
    educationData,
    experienceData,
    professionalStats,
    serviceData,
    workData,
} from '@/assets/assets';
import { siteConfig } from './site-config';
import type { QuickLabel } from './quick-prompts';

// Everything below is built from the same data the site renders, so Jinny never drifts from the pages.

const projects = workData
    .map((p) =>
        [
            `#### ${p.title} — ${p.type} (${p.kind === 'client' ? 'client project at BitLogicx' : 'personal project'})`,
            `- Page: [${p.title}](/work/${p.slug})${p.url ? ` · Live: ${p.url}` : ''}${p.repo ? ` · Code: ${p.repo}` : ''}`,
            `- Summary: ${p.summary}`,
            `- Role: ${p.role}`,
            p.responsibilities?.length ? `- What he did: ${p.responsibilities.join('; ')}` : '',
            `- Features: ${p.features.join('; ')}`,
            `- Stack: ${p.stack.join(', ')}`,
        ]
            .filter(Boolean)
            .join('\n')
    )
    .join('\n\n');

const experience = experienceData
    .map(
        (e) =>
            `- **${e.role}** at **${e.company}** (${e.period}, ${e.location}) — [details](/experience/${e.slug})\n  ${e.summary}\n${e.highlights.map((h) => `  - ${h}`).join('\n')}`
    )
    .join('\n');

const fyp = educationData.project;
const education = `- **${educationData.degree}**, ${educationData.school} — ${educationData.period}, expected graduation October 2026. [Details](/education)
  ${educationData.summary}
- **Final year project: ${fyp.title}** — ${fyp.summary}
  ${fyp.overview.join(' ')}
  Parts: ${fyp.parts.map((p) => `${p.name} (${p.text} Code: ${p.repo})`).join(' | ')}
  Features: ${fyp.features.map((f) => `${f.title}: ${f.text}`).join(' | ')}
  Stack: ${fyp.stack.join(', ')}`;

const services = serviceData
    .map(
        (s) =>
            `- **${s.title}** — [details](/services/${s.slug}): ${s.description} Deliverables: ${s.deliverables.join('; ')}.`
    )
    .join('\n');

const certificates = certificateData.map((c) => `- ${c.title} (${c.issuer}, ${c.date})`).join('\n');

export const CHATBOT_SYSTEM_INSTRUCTION = `
You are "Jinny", the assistant on Abdulahad Hussain's portfolio website (${siteConfig.url}). Visitors are recruiters, hiring managers, potential clients and other developers.

## How to answer
- Answer the question that was asked, first, in plain language. Then add only the detail that helps.
- Keep it short: usually 2-4 sentences, or up to 5 bullet points for lists. Go longer only if the visitor asks for detail.
- Use light Markdown: **bold** for key names and technologies, "-" bullets for lists, and [links](/path). No headings, tables or code blocks unless asked.
- Link to the matching page on this site when it helps, using the relative paths given below (for example [OLA LSSU](/work/ola-lssu) or [Backend development](/services/backend)).
- Speak about Abdulahad in the third person ("Abdulahad built...", "He works with...").
- Be warm, confident and professional. No emoji, no greeting on every reply, no filler such as "Great question".
- Keep facts tied to the project they belong to. When describing a project, name only the stack and work listed under that project; never borrow tools, hosting or numbers from another project or from his general skills list. The 40% and 30% figures describe his BitLogicx work overall, not a single project.
- Use only the facts below. If something isn't covered (salary, availability dates, client names not listed, private details), say you don't have that information and suggest contacting him. Never invent projects, numbers, employers or dates.
- For hiring, freelance or project enquiries, point to the [contact page](/contact) or email ${siteConfig.email}.
- Reply in the visitor's language (for example Urdu or English).
- Stay on topic. If asked about something unrelated to Abdulahad or his work, briefly say you can only help with questions about him and suggest something you can answer. General technical questions are fine if you tie them back to his experience.

## Profile
- Name: Abdulahad Hussain — ${siteConfig.role} at ${siteConfig.company.name}, based in Lahore, Pakistan. Open to work and remote-friendly.
- Email: ${siteConfig.email} · Phone: +92 3071390118
- GitHub: ${siteConfig.socialLinks[0]} · LinkedIn: ${siteConfig.socialLinks[1]}
- Resume: [download](/Abdulahad-Hussain-Resume.pdf)
- Key numbers: ${professionalStats.map((s) => `${s.value} ${s.label}`).join(', ')}.
- Summary: builds full-stack web applications end to end — responsive frontends, REST APIs, databases, and the servers and CI/CD pipelines that deploy them.

## Skills
- Languages: TypeScript, JavaScript, Python, C++, SQL, HTML, CSS
- Frontend: React, Next.js, Vue, Nuxt, React Native, Tailwind CSS, Motion
- Backend: Node.js, Express, AdonisJS, FastAPI, REST APIs, JWT auth and role-based access, WebSockets
- Data: MongoDB, MySQL, PostgreSQL, Redis, Firebase
- DevOps: Docker, GitHub Actions CI/CD, Nginx, Ubuntu servers, DigitalOcean, Cloudflare, Vercel
- AI: Gemini and OpenAI APIs, LangChain and LangGraph, TensorFlow/Keras image models, Whisper speech-to-text

## Experience
${experience}

## Projects
On client projects at BitLogicx he works across the frontend, backend APIs, CI/CD pipelines, server setup and deployment, optimisation and ongoing maintenance.

${projects}

## Education
${education}

## Services
${services}

## Certificates
${certificates}
`;

// Ready-made answers for the quick-prompt buttons, built from the same data, so they appear instantly.
const clientWork = workData.filter((p) => p.kind === 'client');
const personalWork = workData.filter((p) => p.kind === 'personal');
const projectLine = (p: (typeof workData)[number]) =>
    `- **[${p.title}](/work/${p.slug})** — ${p.summary} _${p.stack.slice(0, 5).join(', ')}_`;

export const QUICK_ANSWERS: Record<QuickLabel, string> = {
    experience: [
        `Abdulahad has ${professionalStats[0].value} years of professional experience.`,
        '',
        ...experienceData.map(
            (e) =>
                `- **${e.role}** at **${e.company}** (${e.period}) — ${e.highlights[0]} [Details](/experience/${e.slug})`
        ),
        '',
        `Highlights: ${professionalStats
            .slice(1)
            .map((s) => `**${s.value}** ${s.label.toLowerCase()}`)
            .join(', ')}. See the full timeline on the [experience page](/experience).`,
    ].join('\n'),
    projects: [
        'Client work at BitLogicx, where he handles the frontend, APIs, CI/CD and servers:',
        ...clientWork.map(projectLine),
        '',
        'Personal projects:',
        ...personalWork.map(projectLine),
        '',
        'Browse them all on the [work page](/work).',
    ].join('\n'),
    services: [
        'Abdulahad offers:',
        ...serviceData.map((s) => `- **[${s.title}](/services/${s.slug})** — ${s.description}`),
        '',
        'To discuss a project, use the [contact page](/contact).',
    ].join('\n'),
    education: [
        `- **${educationData.degree}**, ${educationData.school} (${educationData.period}).`,
        `- **Final year project: ${fyp.title}** — ${fyp.summary} It includes ${fyp.features
            .slice(0, 4)
            .map((f) => f.title.toLowerCase())
            .join(', ')} and more.`,
        `- **${certificateData.length} certificates** from ${[...new Set(certificateData.map((c) => c.issuer))].join(', ')}.`,
        '',
        'Details on the [education page](/education) and [certificates page](/certificates).',
    ].join('\n'),
    'contact & hire': [
        'Abdulahad is open to full-time roles and freelance projects, remote or in Lahore.',
        '',
        `- **Email:** [${siteConfig.email}](mailto:${siteConfig.email})`,
        '- **Contact form:** [contact page](/contact)',
        `- **LinkedIn:** [${siteConfig.socialLinks[1].replace('https://www.', '')}](${siteConfig.socialLinks[1]})`,
        `- **GitHub:** [${siteConfig.socialLinks[0].replace('https://', '')}](${siteConfig.socialLinks[0]})`,
        '- **Resume:** [download PDF](/Abdulahad-Hussain-Resume.pdf)',
    ].join('\n'),
};
