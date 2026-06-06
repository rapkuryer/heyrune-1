# Deployment

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel

1. Import [github.com/rapkuryer/heyrune](https://github.com/rapkuryer/heyrune) on Vercel
2. Framework preset: **Next.js** (auto-detected)
3. Environment variables:
   - `WEBSITE_URL` = `https://heyrune.fund`
   - `OPENAI_API_KEY` = your key (required for `/agent`)
4. Add custom domain `heyrune.fund` in project settings

## Build

```bash
npm run build
npm start
```

Production build runs `next-sitemap` automatically via the `postbuild` script.
