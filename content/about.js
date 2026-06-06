import { site } from './museum'

export const developer = {
  name: 'Ilya Kalashnikov',
  handle: '@rapkuryers',
  role: 'Builder · Base ecosystem · Museum curator',
  photo: '/images/ilya-kalashnikov.jpg',
  tagline: 'Building on Base for years. Saving for the dream — one block at a time.',
  twitter: site.twitter,
  github: site.github,
  intro:
    'I am Ilya Kalashnikov — a long-time developer in the Base ecosystem. I built heyrune as a living museum for the chain I have watched grow from testnet experiments to a global onchain economy.',
  docsBrief:
    'Heyrune is curated by Ilya Kalashnikov (@rapkuryers) — a Base developer who has shipped in the ecosystem for years. After his previous Twitter account was suspended without explanation, he relaunched on X and built this museum to document Base culture, protocols, and builders. The project is open source and growing in public.',
  sections: [
    {
      id: 'who',
      title: 'Who I am',
      paragraphs: [
        'My name is Ilya Kalashnikov. I am a developer, curator, and builder who has spent years inside the Base ecosystem — not as a spectator, but as someone who ships contracts, integrates protocols, breaks things on testnet, and tries again on mainnet until the UX feels right.',
        'Heyrune is my personal project: an interactive museum, a documentation hub, and an AI guide trained on everything I have learned watching Base evolve. It is open source, it lives on GitHub, and it grows in public on X at @rapkuryers.',
        'I believe the best ecosystems are remembered through culture — memes, launches, failed experiments, and the builders who stayed when it was still uncertain. That is what I am trying to preserve here.',
      ],
    },
    {
      id: 'early-base',
      title: 'Early days on Base',
      paragraphs: [
        'I started building on Base before mainnet felt like a foregone conclusion. Testnet was a sandbox of half-finished interfaces, ambitious tokenomics, and groups of developers who shared deploy scripts in DMs because there was no playbook yet.',
        'Those early months taught me how an L2 actually feels: not TPS charts, but wallet pop-ups, bridge delays, RPC quirks, and the moment a friend successfully mints something onchain for the first time. Base was positioned as Coinbase’s open, builder-first chain — and for many of us, it became the place where consumer crypto could finally happen.',
        'I deployed experiments across DeFi routing, simple consumer flows, and internal tooling. Some projects stayed small; others became the foundation for how I think about gas abstraction, batching, and onboarding users who do not care about chain architecture — they care that it works.',
        'When mainnet launched in August 2023, the energy shifted overnight. What had been a tight builder circle exploded into Onchain Summer, viral mints, and a culture that felt closer to the early web than to traditional finance.',
      ],
    },
    {
      id: 'defi-work',
      title: 'DeFi & protocol integrations',
      paragraphs: [
        'A large part of my work has been connecting applications to the liquidity and lending layer that makes Base usable at scale. I have integrated Aerodrome for routing and incentives, Morpho for lending markets, Uniswap for deep pairs, and USDC-native flows that treat stablecoins as the default unit of account — not an afterthought.',
        'I care about the boring parts: slippage guards, approval flows, simulation before send, clear error states when a pool is illiquid, and gas estimates that do not lie. Dashboards full of APY numbers are easy; making a first-time user successfully swap without rage-quitting is hard.',
        'I have spent time in liquidity bootstrapping mechanics, ve-token models, gauge voting interfaces, and the UX patterns that help people understand impermanent loss without reading a whitepaper. Base DeFi matured fast — and my work followed that curve from experimentation to production-grade integrations.',
        'Security mindset is non-negotiable: external calls minimized, approvals scoped, upgrade paths documented, and users warned when they leave the happy path. I have reviewed countless integration PRs and still treat every mainnet deploy like the first one.',
      ],
    },
    {
      id: 'consumer-ux',
      title: 'Consumer apps & wallet UX',
      paragraphs: [
        'Base won because it lowered the cost of trying things. I have built flows around Coinbase Smart Wallet, passkey login, paymasters that sponsor gas, and EIP-7702 patterns that let EOAs behave like smart accounts for a session — batching actions, paying in USDC, and skipping seed phrases where possible.',
        'Consumer crypto dies when onboarding feels like a tax audit. I obsess over first-session success: how many taps to first transaction, where users drop off, what copy explains “sign” without sounding like legal threats, and how to recover when RPC nodes hiccup during a demo.',
        'Social and creator tooling — minting, media, profile pages — showed me how culture spreads faster than TVL charts. Integrating Zora-style flows and Farcaster-adjacent identity taught me that onchain products win when they feel fun before they feel financial.',
        'Every app I ship assumes mobile-first, intermittent connectivity, and users who will not read docs. The museum site itself is an exercise in that philosophy: scroll-driven storytelling, heavy typography, and an agent for people who would rather ask than hunt through pages.',
      ],
    },
    {
      id: 'agents',
      title: 'AI agents & the next layer',
      paragraphs: [
        'The agentic economy on Base is not hype to me — it is the next interface layer. Autonomous systems that request resources, receive HTTP 402 payment terms, settle in USDC via x402, and continue operating without a human clicking “confirm” every thirty seconds.',
        'I experiment with trading assistants, onchain copilots, and museum-style knowledge agents (like Heyrune Agent on this site) that ground LLM responses in curated facts instead of hallucinating chain history. Agents fail when context is shallow; they succeed when the builder owns the knowledge base.',
        'Flashblocks, sub-second confirmations, and cheap fees matter more for agents than for humans refreshing a portfolio once a day. High-frequency coordination is why Base became a natural home for this wave — and why I am building agent tooling here rather than elsewhere.',
        'I follow Virtuals, Bankr, Avantis, and the broader agent launchpad culture not as a tourist but as someone wiring payments, permissions, and safety rails into production flows. The museum’s agent page is both product and research notes from that work.',
      ],
    },
    {
      id: 'heyrune',
      title: 'Why I built heyrune',
      paragraphs: [
        'Every major technological movement deserves an archive. Base has corporate announcements, but it also has memes, rogue launches, community rituals, and builders whose names never made it into press releases. Heyrune is my attempt to hold both truths at once.',
        'The main exhibition is a scroll-driven floor: timeline cards, protocol features, a builders index, and WebGL atmosphere because museums should feel like places you wander — not spreadsheets. Documentation goes deep on Flashblocks, x402, wallet comparisons, and DeFi tables because newcomers need maps, not slogans.',
        'The Heyrune Agent answers questions in plain language, trained on curated knowledge about Base and this project. It is the guide I wished existed when I was learning the ecosystem alone at 2 a.m.',
        'Everything is on GitHub because trust is built in public. If you find a mistake in the timeline or a missing protocol, open an issue — the museum is alive, like the chain it documents.',
      ],
    },
    {
      id: 'twitter',
      title: 'Twitter, suspension & starting over',
      paragraphs: [
        'For years I shared builds, threads, and ecosystem notes on Twitter under a previous account. That account was suspended without a clear explanation — no meaningful appeal path, no transparency, just silence. Many builders know this feeling: your audience and history vanish because a platform decided so.',
        'I did not want to pretend nothing happened. I started fresh at @rapkuryers — a new page, same person, same work ethic. It is slower to rebuild reach, but it is honest. This site, the museum, and the open-source repo are the home base now; X is where I show daily progress.',
        'If you followed me before and wondered where I went — I am here. The work never stopped. Only the username changed.',
        'I document the restart publicly because platform risk is part of builder life. Own your distribution where you can: domain, repo, email list, onchain identity — not just rented social graphs.',
      ],
    },
    {
      id: 'dream',
      title: 'Saving for the dream',
      paragraphs: [
        'Outside of code I am collecting toward a personal dream — the kind that does not fit in a quarterly roadmap. It takes years of disciplined work, saying no to shortcuts, and choosing projects that compound skills instead of chasing noise.',
        'Base is where I decided to build that future. Not because it is perfect, but because it rewards builders who show up consistently: ship, learn, ship again. Every contract deployed, every user onboarded, every doc written is a brick.',
        'Heyrune is part of that path — proof of work you can click through. If the museum helps someone understand why Base mattered, that compounds too.',
        'I share progress on X not to perform success, but to stay accountable. Building in public is how I keep moving when motivation dips.',
      ],
    },
    {
      id: 'stack',
      title: 'Technical stack & craft',
      paragraphs: [
        'Onchain: Solidity, Foundry/Hardhat workflows, upgrade patterns, multisig ops, indexers, and integration testing against mainnet forks. I treat interfaces as products — events, errors, and NatSpec are user-facing API surfaces.',
        'Frontend: React, Next.js, TypeScript, wallet connectors, viem/wagmi-style flows, animation systems (GSAP, Lenis smooth scroll), WebGL for ambient exhibition layers, and performance budgets on mobile networks.',
        'AI: OpenAI APIs, structured system prompts, local conversation history, guardrails against inventing chain facts, and iterative prompt tuning against real user questions from the agent page.',
        'Design: typography-led marketing sites, high-contrast dark/light themes, accessibility basics, and SCSS design tokens that survive rebrands. I care that sites feel intentional — not template-generated.',
        'Ops: Vercel-style deploys, env hygiene, sitemap/SEO, PWA configs, and never committing secrets. Boring ops keep creative work shippable.',
      ],
    },
    {
      id: 'community',
      title: 'Community & how I work',
      paragraphs: [
        'I participate in builder circles around Base — sharing deploy tips, reviewing friends’ contracts, amplifying launches that deserve attention, and calling out UX that will hurt adoption. Ecosystems grow when seniors help juniors avoid known cliffs.',
        'I prefer async, written communication: GitHub issues, long-form docs, threads with screenshots. Meetings are expensive; clear repos are cheap.',
        'I optimize for maintainability over cleverness. Future me (and future contributors) should understand the code without a séance.',
        'When I do not know something, I say so — then I go read the spec, test on testnet, and write it down for the next person. That is how museums and docs stay honest.',
      ],
    },
    {
      id: 'now',
      title: 'What I am building now',
      paragraphs: [
        'Expanding heyrune: more exhibitions, richer agent knowledge, tighter docs, and performance passes on mobile. The museum should feel faster and deeper every month.',
        'Continuing agent experiments on Base — payments, permissions, and safe defaults for autonomous flows that normal users can still reason about.',
        'Growing @rapkuryers with honest build logs: what shipped, what broke, what I learned. No fake guru energy — just work.',
        'If you are building on Base and want to talk integrations, culture, or museum curation — reach out on X or GitHub. I reply when I can.',
      ],
    },
  ],
  experience: [
    {
      title: 'Base ecosystem · production deployments',
      detail:
        'Years of mainnet shipping — contracts, frontends, wallet flows, monitoring, and incident response across DeFi and consumer apps.',
    },
    {
      title: 'Aerodrome & DEX integrations',
      detail:
        'Routing, liquidity pools, gauge mechanics, and trader-facing UX with sane defaults for slippage and approvals.',
    },
    {
      title: 'Morpho & lending markets',
      detail:
        'Supply/borrow flows, risk copy for users, and integration patterns that mirror how people actually think about debt — not protocol dashboards.',
    },
    {
      title: 'Smart wallets & EIP-7702',
      detail:
        'Passkeys, paymasters, batch transactions, and USDC gas payment paths via Coinbase Smart Wallet patterns.',
    },
    {
      title: 'x402 & agent payments',
      detail:
        'HTTP 402 flows, USDC settlement, and agent clients that pay for API access without manual clicks each time.',
    },
    {
      title: 'Heyrune museum · full stack',
      detail:
        'WebGL hero, Lenis scroll, timeline exhibitions, docs widgets, agent chat, sitemap, SEO, and open-source maintenance.',
    },
    {
      title: 'Open-source maintenance',
      detail:
        'Public GitHub repo, issue triage, content updates for timeline/builders, and transparent iteration on X.',
    },
    {
      title: 'Content & technical writing',
      detail:
        'Long-form docs on Flashblocks, Superchain architecture, DeFi comparisons, and museum navigation guides.',
    },
    {
      title: 'Security-minded integrations',
      detail:
        'Scoped approvals, simulation-before-send, minimal external calls, and user warnings on non-standard paths.',
    },
    {
      title: 'Mobile-first frontend performance',
      detail:
        'Responsive typography, lazy WebGL, scroll performance, and hydration-safe patterns on Next.js.',
    },
  ],
}
