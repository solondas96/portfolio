<div align="center">
<img width="1200" height="475" alt="Solon Das Portfolio" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Solon Das — Senior Data Engineer Portfolio

A refined, production-grade portfolio showcasing **data engineering leadership**, **GenAI platform architecture**, and **distributed systems design** at enterprise scale.

**Live Site**: [solondas.dev](https://solondas.dev) (when deployed)

---

## Features

- **Dark-mode professional design** (Claude-inspired dark theme + pop orange accents)
- **Token-efficient LLM integration** using **Headroom** for context compression
- **Responsive, animated UI** built with React, Vite, Tailwind CSS, and Framer Motion
- **Content-driven architecture** (all resume data lives in `resume.json`)
- **Production-ready** — optimized for performance, accessibility, and SEO

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Motion (animations)
- **Token Compression**: [Headroom](https://github.com/headroomlabs-ai/headroom) (reduces LLM token usage by 15-20%)
- **Icons**: Lucide React
- **Build & Deploy**: Vite + Vercel

---

## Setup & Running Locally

### Prerequisites
- Node.js 18+

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The portfolio will be available at `http://localhost:3000`.

---

## Headroom Integration

This portfolio demonstrates practical use of **Headroom** — a context compression layer that reduces token usage in LLM-powered features.

### Why Headroom?

As a data engineer building AI-ready platforms, I "dogfood" the tools I integrate. This portfolio:
- Uses Headroom utilities for token-efficient context compression
- Shows production patterns for cost-optimized LLM integration
- Reflects my philosophy: **build intelligent systems that are efficient and economically sustainable**

### Using Headroom

#### Setup (Optional, for LLM features)

```bash
# Install Headroom CLI
pip install "headroom-ai[proxy]"

# Run the proxy
headroom proxy --port 8787

# Set environment variable
export REACT_APP_HEADROOM_PROXY_URL=http://localhost:8787
export REACT_APP_HEADROOM_ENABLED=true
```

#### Usage in Components

```typescript
import { compressPortfolioContext } from './utils/headroom';

const compressed = await compressPortfolioContext(messages);
// Reduces token count by 15-20% without sacrificing quality
```

### Files

- `src/utils/headroom.ts` — Compression utilities
- `src/components/HeadroomExample.tsx` — Example component showing integration
- `HEADROOM_INTEGRATION.md` — Detailed Headroom setup guide

### Resources

- [Headroom GitHub](https://github.com/headroomlabs-ai/headroom)
- [Headroom Docs](https://headroom-docs.vercel.app/docs)
- [Kompress-v2-base Model Card](https://huggingface.co/chopratejas/kompress-v2-base)

---

## Project Structure

