import { stackIcons } from '@/app/lib/content';
import TechIcon from './TechIcon';

export default function StackTags({
    stack,
    className = '',
}: {
    stack: string[];
    className?: string;
}) {
    return (
        <ul className={`flex flex-wrap gap-2 ${className}`}>
            {stack.map((name) => (
                <li
                    key={name}
                    className="border-line bg-panel flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-xs"
                >
                    {stackIcons[name] && (
                        <TechIcon
                            icon={stackIcons[name]}
                            className="size-3.5"
                        />
                    )}
                    {name}
                </li>
            ))}
        </ul>
    );
}
