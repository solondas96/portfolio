# Solon Das Portfolio

Personal portfolio for Solon Das, focused on data engineering leadership, GenAI systems, and applied AI product work.

## Highlights

- Animated, responsive single-page portfolio built with React and Vite
- Data-driven content model powered by [src/data/resume.json](src/data/resume.json)
- Dedicated Projects and Research section with separate Live and Repository actions
- Optional Headroom integration utilities for token-efficient LLM context compression

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide React
- Headroom AI (optional integration)

## Local Development

Prerequisites:
- Node.js 18+

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

The app runs on http://localhost:3000.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Scripts

- `npm run dev`: Start Vite dev server at port 3000
- `npm run build`: Create production build in [dist](dist)
- `npm run preview`: Preview production build locally
- `npm run lint`: TypeScript type-check (`tsc --noEmit`)
- `npm run clean`: Remove build output

## Project Structure

```text
.
├── src
│   ├── components
│   ├── data
│   │   └── resume.json
│   ├── utils
│   │   └── headroom.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── HEADROOM_INTEGRATION.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Content Updates

Most portfolio content can be updated in [src/data/resume.json](src/data/resume.json):

- Basics (name, headline, summary, links)
- Experience, achievements, skills, education
- Projects and Research cards
- Testimonials and certifications

## Headroom Notes

Headroom support is included as an optional integration layer:

- Utility module: [src/utils/headroom.ts](src/utils/headroom.ts)
- Example component: [src/components/HeadroomExample.tsx](src/components/HeadroomExample.tsx)
- Setup guide: [HEADROOM_INTEGRATION.md](HEADROOM_INTEGRATION.md)

If you do not need Headroom-backed features right now, you can keep these files as future-ready scaffolding.

## Deployment

This project builds as a static frontend and can be deployed to Vercel, Netlify, GitHub Pages, or any static host.

Build command:

```bash
npm run build
```

Publish the generated [dist](dist) directory.

