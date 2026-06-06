import cn from 'clsx'
import { Button } from 'components/button'
import { DocSectionContent } from 'components/docs-widgets'
import { Link } from 'components/link'
import { documentation, site } from 'content/museum'
import { developer } from 'content/about'
import { Layout } from 'layouts/default'
import GitHub from 'icons/github.svg'
import s from './docs.module.scss'

export default function Docs() {
  return (
    <Layout
      theme="light"
      footerCompact
      skipIntro
      seo={{
        title: 'Documentation – Heyrune',
        description: documentation.intro,
        keywords: [...site.keywords, 'documentation', 'museum guide'],
      }}
      className={s.docs}
    >
      <section className={cn(s.hero, 'layout-block')}>
        <p className={cn('p-xs', s.eyebrow)}>{site.name}</p>
        <h1 className="h1">Documentation</h1>
        <p className={cn('p-l', s.lead)}>{documentation.intro}</p>
        <div className={s.actions}>
          <Button arrow href="/">
            Back to museum
          </Button>
          <Button arrow href="/agent">
            Heyrune Agent
          </Button>
          <Button arrow href={site.twitter}>
            Twitter
          </Button>
          <Button arrow icon={<GitHub />} href={site.github}>
            Source code
          </Button>
          <Button arrow href={site.repoDocs}>
            Docs on GitHub
          </Button>
        </div>
      </section>

      <section className={cn(s.content, 'layout-grid')}>
        <aside className={s.sidebar}>
          <p className="h4">Topics</p>
          <ul className={s.nav}>
            {documentation.sections.map(({ id, title }) => (
              <li key={id}>
                <Link className={cn(s.navLink, 'p-xs')} href={`#${id}`}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className={s.sections}>
          {documentation.sections.map((section, index) => (
            <article key={section.id} id={section.id} className={s.section}>
              <p className={cn('p-xs', s.number)}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="h3">{section.title}</h2>
              <p className="p">
                {section.curator ? developer.docsBrief : section.body}
              </p>
              {!section.curator && <DocSectionContent section={section} />}
              {section.curator && (
                <div className={s.curatorLinks}>
                  <Link className={cn('p-xs', s.curatorLink)} href="/about">
                    Full bio →
                  </Link>
                  <Link
                    className={cn('p-xs', s.curatorLink)}
                    href={developer.twitter}
                  >
                    {developer.handle}
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
