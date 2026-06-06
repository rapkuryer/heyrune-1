# Heyrune org | Base Museum

**Official repository** for [heyrune.org](https://heyrune.org) — Heyrune org | Base Museum — heyrune.org

Heyrune is an interactive exhibition documenting the Base network: protocols, builders, culture, and onchain history.

## Features

- Scroll-driven museum exhibition with timeline, protocol cards, and builder index
- [Heyrune Agent](/agent) — AI guide powered by an OpenAI-compatible API
- [Documentation](/docs) — museum guide and Base ecosystem reference
- [About](/about) — developer bio and project story

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `WEBSITE_URL` | No | Production URL for sitemap/SEO (default: `https://heyrune.fund`) |
| `OPENAI_API_KEY` | For Agent | OpenAI-compatible API key |
| `OPENAI_MODEL` | No | Model name (default: `gpt-4o-mini`) |

## Deploy on Vercel

1. Import this repository on [Vercel](https://vercel.com)
2. Set **Root Directory** to `.` (repository root is the Next.js app)
3. Add environment variables from `.env.example`
4. Connect custom domain `heyrune.fund`

## Documentation

- On-site guide: [heyrune.fund/docs](https://heyrune.fund/docs)
- Public markdown docs: [docs/](./docs/)

## License

MIT — see repository for details.

Built in public by [@rapkuryers](https://x.com/rapkuryers).
