import {
    educationData,
    experienceData,
    serviceData,
    workData,
} from '@/assets/assets';
import { siteConfig } from '../lib/site-config';
import { serviceTitles } from '../lib/seo';

// llms.txt (llmstxt.org): a plain summary for AI assistants and AI search, built from the site's own data.
export const dynamic = 'force-static';

export function GET() {
    const u = siteConfig.url;
    const fyp = educationData.project;
    const body = `# ${siteConfig.name}

> ${siteConfig.description} Open to full-time roles and freelance projects, remote or in Lahore.

- Role: ${siteConfig.role} at ${siteConfig.company.name}
- Location: ${siteConfig.location.locality}, ${siteConfig.location.countryName} (works remotely with clients worldwide)
- Email: ${siteConfig.email}
- WhatsApp: ${siteConfig.phone} (${siteConfig.whatsappUrl})
- GitHub: ${siteConfig.socialLinks[0]}
- LinkedIn: ${siteConfig.socialLinks[1]}
- Skills: ${siteConfig.knowsAbout.join(', ')}

## Services

${serviceData.map((s) => `- [${serviceTitles[s.slug] ?? s.title}](${u}/services/${s.slug}): ${s.description}`).join('\n')}

## Projects

${workData
    .map(
        (p) =>
            `- [${p.title}](${u}/work/${p.slug}) (${p.type}, ${p.kind === 'client' ? `client work at ${siteConfig.company.name}` : 'personal project'}): ${p.summary} Stack: ${p.stack.join(', ')}.`
    )
    .join('\n')}

## Experience

${experienceData.map((e) => `- [${e.role} at ${e.company}](${u}/experience/${e.slug}) (${e.period}): ${e.summary}`).join('\n')}

## Education

- [${educationData.degree}, ${educationData.school}](${u}/education) (${educationData.period})
- Final year project: [${fyp.title}](${u}/work/zabaan-e-kissan). ${fyp.summary}

## Pages

- [About](${u}/about)
- [Work](${u}/work)
- [Services](${u}/services)
- [Experience](${u}/experience)
- [Certificates](${u}/certificates)
- [Contact](${u}/contact)
- [Resume (PDF)](${u}/Abdulahad-Hussain-Resume.pdf)
`;
    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
