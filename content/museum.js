export const site = {
  name: 'heyrune',
  url: 'https://heyrune.fund',
  github: 'https://github.com/rapkuryer/heyrune',
  repoDocs: 'https://github.com/rapkuryer/heyrune/tree/main/docs',
  twitter: 'https://x.com/rapkuryers',
  base: 'https://base.org',
  title: 'Base Ecosystem Museum',
  tagline:
    'Explore the protocols, culture, builders and onchain history that shaped Base.',
  description:
    'An interactive museum documenting the evolution of the Base ecosystem — protocols, culture, AI agents, milestones and the builders who shaped onchain history.',
  keywords: [
    'Base',
    'Base ecosystem',
    'onchain',
    'DeFi',
    'AI agents',
    'blockchain museum',
    'heyrune',
    'Coinbase L2',
  ],
}

export const timeline = [
  {
    number: '01',
    text: 'Base announced — Coinbase reveals its vision for an open, builder-first L2',
  },
  {
    number: '02',
    text: 'Testnet launch — early builders begin deploying apps and experiments onchain',
  },
  {
    number: '03',
    text: 'Mainnet launch — Base opens to the world, August 2023',
  },
  {
    number: '04',
    text: 'Onchain Summer — a cultural moment that brought millions into the ecosystem',
  },
  {
    number: '05',
    text: 'Growth milestones — users, transactions, and TVL accelerate across the network',
  },
  {
    number: '06',
    text: 'Major ecosystem launches — DeFi, social, gaming, and consumer apps scale globally',
  },
  {
    number: '07',
    text: 'AI ecosystem expansion — autonomous agents and onchain intelligence take center stage',
  },
]

export const ecosystemCards = [
  { text: '2B+ cumulative transactions — the rhythm of a global onchain economy' },
  { text: 'Millions of active wallets — a growing community of onchain participants' },
  { text: '500+ ecosystem projects — protocols, apps, and experiments in production' },
  { text: 'Millions of smart contracts — infrastructure written permanently onchain' },
  {
    text: 'Aerodrome — DeFi · The liquidity engine powering Base trading',
  },
  {
    text: 'Farcaster — Social · Decentralized social graph for onchain culture',
  },
  {
    text: 'Virtuals Protocol — AI · Launchpad for autonomous agents on Base',
  },
  {
    text: 'Zora — Consumer · Creator minting and media at internet scale',
  },
  {
    text: 'Coinbase Smart Wallet — Infrastructure · Account abstraction for the next billion users',
  },
]

export const builders = [
  {
    title: 'Coinbase & Base Core Team',
    source: 'Infrastructure',
    href: 'https://base.org',
  },
  {
    title: 'Jesse Pollak',
    source: 'Base Ecosystem',
    href: 'https://base.org',
  },
  {
    title: 'Aerodrome Finance',
    source: 'DeFi',
    href: 'https://aerodrome.finance',
  },
  {
    title: 'Farcaster',
    source: 'Social',
    href: 'https://farcaster.xyz',
  },
  {
    title: 'Virtuals Protocol',
    source: 'AI Agents',
    href: 'https://virtuals.io',
  },
  {
    title: 'Zora',
    source: 'Consumer Apps',
    href: 'https://zora.co',
  },
  {
    title: 'Morpho on Base',
    source: 'DeFi',
    href: 'https://morpho.org',
  },
  {
    title: 'Uniswap on Base',
    source: 'DeFi',
    href: 'https://app.uniswap.org',
  },
  {
    title: 'Avantis',
    source: 'AI · Trading Agents',
    href: 'https://avantisfi.com',
  },
  {
    title: 'Bankr',
    source: 'AI · Onchain Assistant',
    href: 'https://bankr.bot',
  },
  {
    title: 'Base Community',
    source: 'Culture · Onchain Summer',
    href: 'https://base.org',
  },
  {
    title: 'Heyrune Curators',
    source: 'Museum · @rapkuryers',
    href: site.twitter,
  },
]

export const documentation = {
  intro:
    'Welcome to the Base Ecosystem Museum. This guide covers the technology, culture, and builders that define Base — plus how to navigate the exhibitions on the main floor.',
  sections: [
    {
      id: 'about',
      title: 'About the museum',
      type: 'text',
      body:
        'Heyrune presents Base as a living technological movement — not a single product, but an ecosystem of protocols, builders, culture, and intelligence unfolding onchain. Scroll the main exhibition to move through time, from early milestones to the AI frontier.',
    },
    {
      id: 'curator',
      title: 'About the curator',
      type: 'text',
      body: null,
      curator: true,
    },
    {
      id: 'performance',
      title: 'Speed & performance',
      type: 'flashblocks',
      body:
        'Base is built to be the fastest EVM chain in production. Flashblocks — sub-blocks every 200ms, co-developed with Flashbots — deliver confirmations up to 10× faster than standard 2-second blocks. Gas capacity has scaled from ~10 Mgas/s toward 150 Mgas/s today, with a path to 400–500 Mgas/s by 2026.',
      stats: [
        { label: 'Flashblock interval', value: '200ms' },
        { label: 'Peak TPS observed', value: '~1,500' },
        { label: 'Typical fee', value: '< $0.05' },
        { label: 'Gas target by 2026', value: '400–500 Mgas/s' },
      ],
    },
    {
      id: 'agents',
      title: 'Agentic economy',
      type: 'x402',
      body:
        'The hottest growth lane on Base in 2025–2026: autonomous agents that pay, trade, and coordinate onchain. The x402 protocol revives HTTP 402 Payment Required — an agent requests a resource, the server responds with a price, the agent settles in USDC, and receives data. Stripe, Cloudflare, Google, and Visa are already in the ecosystem.',
      steps: [
        { label: 'Request', detail: 'AI agent calls an API endpoint' },
        { label: '402', detail: 'Server responds with payment terms' },
        { label: 'Pay', detail: 'Agent settles in USDC on Base' },
        { label: 'Access', detail: 'Resource unlocked — data or compute delivered' },
      ],
    },
    {
      id: 'wallets',
      title: 'Smart wallet UX',
      type: 'wallet-compare',
      body:
        'EIP-7702 (Pectra, May 2025) lets a regular EOA temporarily delegate to smart-contract code — batch transactions, pay gas in USDC, and authenticate with passkeys. Coinbase Smart Wallet and paymasters extend this into onboarding without seed phrases.',
      compare: [
        {
          title: 'Classic EOA',
          items: [
            'One action per signature',
            'Gas paid in ETH only',
            'Seed phrase onboarding',
          ],
        },
        {
          title: 'Smart EOA · 7702',
          items: [
            'Batch multiple calls',
            'Gas in USDC or sponsored',
            'Passkey / biometric login',
          ],
        },
      ],
    },
    {
      id: 'defi',
      title: 'DeFi ecosystem',
      type: 'protocols',
      body:
        'Base DeFi is no longer experimental — it is where liquidity, lending, and trading concentrate for the Superchain. These protocols anchor daily activity across the network.',
      protocols: [
        { name: 'Morpho', category: 'Lending', fact: '#2 globally by TVL, trailing only Aave' },
        { name: 'Aerodrome', category: 'DEX', fact: 'Top-3 EVM DEX by volume' },
        { name: 'USDC', category: 'Stablecoin', fact: 'Natively issued on Base by Circle' },
        { name: 'Uniswap', category: 'DEX', fact: 'Deep liquidity hub for new launches' },
      ],
    },
    {
      id: 'architecture',
      title: 'Under the hood',
      type: 'stats',
      body:
        'Base is evolving its stack: migration from OP Stack components toward a proprietary sequencer built on Reth (replacing geth), fault proofs for decentralized verification, and Flashblocks that fix transaction ordering to reduce toxic MEV.',
      stats: [
        { label: 'Sequencer', value: 'Reth migration' },
        { label: 'Verification', value: 'Fault proofs live' },
        { label: 'Interop', value: 'Superchain' },
        { label: 'MEV', value: 'Flashblocks' },
      ],
    },
    {
      id: 'gas-calculator',
      title: 'Cost comparison',
      type: 'gas-calculator',
      body:
        'EIP-4844 blobs lowered L1 data costs, but Base still wins for high-frequency activity — agents, games, and consumer apps that need sub-cent fees at scale.',
    },
    {
      id: 'navigate',
      title: 'Navigate the museum',
      type: 'text',
      body:
        'The main floor is organized as exhibitions: a horizontal timeline of seven milestones, protocol cards grouped by category, a builders index with outbound links, and a closing hall on culture and the future of Base. Use the sidebar here to jump between topics, or return home and scroll.',
    },
  ],
}

export const scrollCta = {
  line1: 'Follow on',
  handle: '@rapkuryers',
}

export const footerNav = [
  {
    title: 'Explore',
    links: [
      { label: 'Museum', href: '/' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Heyrune Agent', href: '/agent' },
      { label: 'About the developer', href: '/about' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Base.org', href: site.base },
      { label: 'GitHub', href: site.github },
      { label: 'Docs on GitHub', href: site.repoDocs },
    ],
  },
  {
    title: 'Connect',
    links: [{ label: 'Twitter', href: site.twitter }],
  },
]
