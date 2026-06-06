# Heyrune · Deployment

## Requirements

- Node.js 18+
- npm

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production (Vercel)

1. Connect this repository in [Vercel](https://vercel.com)
2. Framework: **Next.js**
3. Environment variables:

| Variable | Value |
|----------|-------|
| `WEBSITE_URL` | `https://heyrune.org` |
| `AGENT_API_KEY` | Heyrune Agent API key |

4. Add custom domain: `heyrune.org`

## Build

```bash
npm run build
npm start
```

The `postbuild` script generates sitemap and robots.txt via `next-sitemap`.
