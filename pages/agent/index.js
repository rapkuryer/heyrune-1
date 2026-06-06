import cn from 'clsx'
import { AgentChat } from 'components/agent-chat'
import { Button } from 'components/button'
import { agent } from 'content/agent-knowledge'
import { site } from 'content/museum'
import { Layout } from 'layouts/default'
import GitHub from 'icons/github.svg'
import s from './agent.module.scss'

export default function AgentPage() {
  return (
    <Layout
      theme="light"
      footerCompact
      skipIntro
      seo={{
        title: 'Heyrune Agent',
        description: agent.intro,
        keywords: [...site.keywords, 'heyrune agent', 'Base AI', 'chat'],
      }}
      className={s.agent}
    >
      <section className={cn(s.hero, 'layout-block')}>
        <p className={cn('p-xs', s.eyebrow)}>{site.name}</p>
        <h1 className="h1">{agent.name}</h1>
        <p className={cn('p-l', s.lead)}>{agent.intro}</p>
        <div className={s.actions}>
          <Button arrow href="/">
            Back to museum
          </Button>
          <Button arrow href="/docs">
            Documentation
          </Button>
          <Button arrow icon={<GitHub />} href={site.github}>
            GitHub
          </Button>
        </div>
      </section>

      <section className={cn(s.chatSection, 'layout-block')}>
        <div className={s.chatWrap}>
          <AgentChat />
          <p className={cn('p-xs', s.note)}>
            Powered by AI · trained on heyrune museum knowledge about Base
          </p>
        </div>
      </section>
    </Layout>
  )
}
