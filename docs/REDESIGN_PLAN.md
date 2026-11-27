# Portfolio Redesign Plan

Branch: `redesign/3d-portfolio`

## Direction

Inspired by the *type* of site you liked (usmansarfraz.dev), not a copy of it.
What we take from it is only the general feel:

- dark, premium, lots of space
- big editorial typography
- smooth scrolling, with sections that animate as you scroll
- one memorable "wow" interaction instead of many small gimmicks

Everything else (layout, colors, fonts, section ideas, 3D pieces) is our own.

## Identity

- **Colors:** near-black `#0a0a0f` base, slate panels `#12131a`, one electric accent: violet `#8b5cf6` with a cyan `#22d3ee` glow for highlights. Light theme kept as an option.
- **Fonts** (via `next/font`): `Sora` for headings, `Inter` for body, `JetBrains Mono` for small code-style labels (fits a full stack engineer).
- **Motif:** code/terminal details (`// labels`, blinking cursor, `<tags>`) instead of serif-italic accents.

## Signature 3D (real WebGL, our own idea)

The reference fakes 3D with CSS. Since you asked for a 3D portfolio, we use real 3D with `@react-three/fiber` + `@react-three/drei`:

1. **Hero scene:** a floating, glassy abstract shape (distorted sphere / knot) lit in violet/cyan that follows the cursor and morphs slowly. Your name + role in large type over it.
2. **Tech sphere:** your tools (React, Next.js, Vue, Node, Docker, MongoDB...) as logos on a rotating 3D sphere you can drag.
3. Everything else stays fast HTML/CSS with `motion` animations, so the page is not one heavy canvas.

## Sections

| # | Section | Idea |
|---|---|---|
| 1 | Navbar | Minimal top bar, hides on scroll down, shows on scroll up; theme toggle + "Hire me" |
| 2 | Hero | 3D shape + name, role typed out terminal-style, Resume + Contact buttons |
| 3 | About | Short bio that reveals line by line, photo with soft glow tilt card, stat counters (years, projects, clients) |
| 4 | Projects | **Sticky stacking cards**: each project card slides up and stacks over the previous as you scroll |
| 5 | Experience + Education | **Vertical timeline** with a glowing line that fills as you scroll; each entry slides in |
| 6 | Tech stack | Draggable 3D logo sphere |
| 7 | Services | Numbered list (01, 02, 03); hovering a row expands it with a description and icon |
| 8 | Certificates | Horizontal auto-scrolling strip of badges |
| 9 | Contact | Big "Let's build something" heading, existing form + `/api/contact`, socials |
| 10 | Footer | Simple, with back-to-top |
| — | Chatbot | Kept, restyled to the new theme |

## Stack changes

- Add `three`, `@react-three/fiber`, `@react-three/drei` (3D)
- Add `lenis` (smooth scroll)
- `motion` (already installed) for every scroll/reveal animation

## What stays untouched

`site-config.ts`, `schema.ts`, OG/Twitter images, sitemap, robots, manifest, `/api/contact` + email templates, `/api/chat`, Vercel analytics.

## Architecture

```
app/
  page.tsx                -> composes sections, no theme state
  lib/content.ts          -> all section text/data in one place
  components/
    three/  (HeroScene, TechSphere)   -> loaded with next/dynamic, ssr: false
    providers/SmoothScroll.tsx        -> Lenis
    sections/ (Navbar, Hero, About, Projects, Journey, Stack, Services, Certificates, Contact, Footer)
    Chatbot/
```

- Theme: `dark` class set by a tiny inline script before hydration (no flash); removes the `isDarkMode` prop-drilling.
- Performance: 3D canvases lazy-load, cap pixel ratio, pause when off-screen.
- `prefers-reduced-motion` / weak phones: static gradient image instead of the hero canvas, flat logo grid instead of the sphere, no smooth scroll.

## Phases (one commit each)

1. Foundation: fonts, colors, theme script, Lenis, `content.ts`, Navbar + Footer
2. Hero with 3D scene
3. About + Projects stacking cards
4. Experience/Education timeline
5. Tech sphere + Services + Certificates
6. Contact + Chatbot restyle
7. Polish: mobile, accessibility, speed check, `npm run build` + lint clean, then PR to `main`
