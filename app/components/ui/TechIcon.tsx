import Image, { type StaticImageData } from 'next/image';

type SvgIcon = { path: string; hex: string };
export type TechIconSource = SvgIcon | StaticImageData;

const isSvgIcon = (icon: TechIconSource): icon is SvgIcon => 'path' in icon;

// Near-black brand colors (Next.js, Vercel, GitHub...) vanish on the dark theme, so those follow the text color.
const isDark = (hex: string) => {
    const n = parseInt(hex, 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
};

export default function TechIcon({
    icon,
    className = 'size-4',
}: {
    icon: TechIconSource;
    className?: string;
}) {
    if (!isSvgIcon(icon)) {
        return <Image src={icon} alt="" aria-hidden className={`${className} object-contain`} />;
    }
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            className={className}
            fill={isDark(icon.hex) ? 'currentColor' : `#${icon.hex}`}
        >
            <path d={icon.path} />
        </svg>
    );
}

// LinkedIn isn't in simple-icons (trademark request), so its mark is kept here.
export const linkedinIcon: SvgIcon = {
    hex: '0A66C2',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};
