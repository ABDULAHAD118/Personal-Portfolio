// Shortcut buttons in the chat window. The API answers these from QUICK_ANSWERS without calling a model.
export const QUICK_PROMPTS = [
    { label: 'experience', prompt: 'Tell me about Abdulahad’s work experience and achievements.' },
    { label: 'projects', prompt: 'What key projects has Abdulahad built and what tech stack was used?' },
    { label: 'services', prompt: 'What services does Abdulahad offer to clients and teams?' },
    { label: 'education', prompt: 'What is Abdulahad’s educational background and certifications?' },
    { label: 'contact & hire', prompt: 'How can I get in touch with or hire Abdulahad?' },
] as const;

export type QuickLabel = (typeof QUICK_PROMPTS)[number]['label'];
