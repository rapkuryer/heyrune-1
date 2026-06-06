import cn from 'clsx'
import { Button } from 'components/button'
import { Link } from 'components/link'
import { developer } from 'content/about'
import { site } from 'content/museum'
import { Layout } from 'layouts/default'
import GitHub from 'icons/github.svg'
import Image from 'next/image'
import s from './about.module.scss'

export default function AboutPage() {
  return (
    <Layout
      theme="light"
      footerCompact
      skipIntro
      seo={{
        title: 'About – Heyrune',
        description: developer.intro,
        keywords: [
          ...site.keywords,
          'Ilya Kalashnikov',
          'builder',
          'curator',
          'Base developer',
        ],
      }}
      className={s.about}
    >
      <section className={cn(s.hero, 'layout-block')}>
        <div className={s.heroGrid}>
          <div className={s.photoWrap}>
            <Image
              src={developer.photo}
              alt={developer.name}
              width={400}
              height={400}
              className={s.photo}
              priority
            />
          </div>
          <div className={s.heroText}>
            <p className={cn('p-xs', s.eyebrow)}>{site.name}</p>
            <h1 className="h1">{developer.name}</h1>
            <p className={cn('p-l', s.role)}>{developer.role}</p>
            <p className={cn('p', s.tagline)}>{developer.tagline}</p>
            <div className={s.actions}>
              <Button arrow href={developer.twitter}>
                Follow on X
              </Button>
              <Button arrow icon={<GitHub />} href={developer.github}>
                GitHub
              </Button>
              <Button arrow href="/">
                Museum
              </Button>
              <Button arrow href="/docs">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={cn(s.content, 'layout-grid')}>
        <aside className={s.sidebar}>
          <p className="h4">Biography</p>
          <ul className={s.nav}>
            {developer.sections.map(({ id, title }) => (
              <li key={id}>
                <Link className={cn(s.navLink, 'p-xs')} href={`#${id}`}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className={s.sections}>
          <article className={s.introBlock}>
            <p className={cn('p', s.introLead)}>{developer.intro}</p>
          </article>

          {developer.sections.map((section, index) => (
            <article key={section.id} id={section.id} className={s.section}>
              <p className={cn('p-xs', s.number)}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="h3">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="p">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}

          <article id="experience" className={s.section}>
            <p className={cn('p-xs', s.number)}>
              {String(developer.sections.length + 1).padStart(2, '0')}
            </p>
            <h2 className="h3">Experience snapshot</h2>
            <ul className={s.experienceList}>
              {developer.experience.map(({ title, detail }) => (
                <li key={title} className={s.experienceItem}>
                  <h3 className={cn('h4', s.experienceTitle)}>{title}</h3>
                  <p className="p">{detail}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={cn(s.closing, 'layout-block')}>
        <p className={cn('p-l', s.closingText)}>
          Saving for the dream — building in public on{' '}
          <Link className="contrast semi-bold" href={developer.twitter}>
            {developer.handle}
          </Link>
          .
        </p>
        <Button className={s.closingCta} arrow href="/agent">
          Ask the Heyrune agent
        </Button>
      </section>
    </Layout>
  )
}
