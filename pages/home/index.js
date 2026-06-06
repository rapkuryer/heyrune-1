import { useRect } from '@studio-freight/hamo'
import cn from 'clsx'

import { Button } from 'components/button'
import { Card } from 'components/card'
import { Title } from 'components/intro'
import { Link } from 'components/link'
import { ListItem } from 'components/list-item'
import { projects } from 'content/projects'
import { site, scrollCta, timeline } from 'content/museum'
import { useScroll } from 'hooks/use-scroll'
import { Layout } from 'layouts/default'
import { clamp, mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import AgentIcon from 'icons/agent.svg'
import Docs from 'icons/docs.svg'
import GitHub from 'icons/github.svg'
import User from 'icons/user.svg'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useIntersection, useWindowSize } from 'react-use'
import s from './home.module.scss'

const Parallax = dynamic(
  () => import('components/parallax').then((mod) => mod.Parallax),
  { ssr: false }
)

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

const HorizontalSlides = dynamic(
  () =>
    import('components/horizontal-slides').then((mod) => mod.HorizontalSlides),
  { ssr: false }
)

const FeatureCards = dynamic(
  () => import('components/feature-cards').then((mod) => mod.FeatureCards),
  { ssr: false }
)

const WebGL = dynamic(
  () => import('components/webgl').then(({ WebGL }) => WebGL),
  { ssr: false }
)

const HeroTextIn = ({ children, introOut }) => {
  return (
    <div className={cn(s['hide-text'], introOut && s['show-text'])}>
      {children}
    </div>
  )
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const zoomRef = useRef(null)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const introOut = useStore(({ introOut }) => introOut)

  const [theme, setTheme] = useState('dark')
  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    if (!lenis) return

    function onClassNameChange(lenis) {
      console.log(lenis.className)
    }

    lenis.on('className change', onClassNameChange)

    return () => {
      lenis.off('className change', onClassNameChange)
    }
  }, [lenis])

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
    if (!zoomWrapperRect.top || !zoomRef.current) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'dark')

    zoomRef.current.style.setProperty('--progress1', progress1)
    zoomRef.current.style.setProperty('--progress2', progress2)

    if (progress === 1) {
      zoomRef.current.style.setProperty('background-color', 'currentColor')
    } else {
      zoomRef.current.style.removeProperty('background-color')
    }
  })

  const [whyRectRef, whyRect] = useRect()
  const [cardsRectRef, cardsRect] = useRect()
  const [whiteRectRef, whiteRect] = useRect()
  const [featuresRectRef, featuresRect] = useRect()
  const [inuseRectRef, inuseRect] = useRect()

  const addThreshold = useStore(({ addThreshold }) => addThreshold)

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({
      id: 'why-end',
      value: top + whyRect.height,
    })
  }, [whyRect])

  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({
      id: 'red-end',
      value: top + cardsRect.height + windowHeight,
    })
  }, [cardsRect])

  useEffect(() => {
    const top = whiteRect.top - windowHeight
    addThreshold({ id: 'light-start', value: top })
  }, [whiteRect])

  useEffect(() => {
    const top = featuresRect.top
    addThreshold({ id: 'features', value: top })
  }, [featuresRect])

  useEffect(() => {
    const top = inuseRect.top
    addThreshold({ id: 'in-use', value: top })
  }, [inuseRect])

  useEffect(() => {
    const top = lenis?.limit
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  const inUseRef = useRef()

  const [visible, setIsVisible] = useState(false)
  const intersection = useIntersection(inUseRef, {
    threshold: 0.2,
  })
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsVisible(true)
    }
  }, [intersection])

  return (
    <Layout
      theme={theme}
      seo={{
        title: 'Heyrune',
        description: site.description,
        keywords: site.keywords,
      }}
      className={s.home}
    >
      <div className={s.canvas}>
        <WebGL />
      </div>

      <section className={s.hero}>
        <div className={cn(s.heroTop, 'layout-grid-inner')}>
          <Title className={s.title} />
          <span className={cn(s.sub)}>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('h3', s.subtitle)}>{site.title}</h2>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('p-xs', s.tm, s.tmDesktop)}>
                <span>©</span> {new Date().getFullYear()} {site.name}
              </h2>
            </HeroTextIn>
          </span>
        </div>

        <div className={cn(s.bottom, 'layout-grid')}>
          <div
            className={cn(
              'hide-on-mobile',
              s['scroll-hint'],
              hasScrolled && s.hide,
              introOut && s.show
            )}
          >
            <div className={s.text}>
              <HeroTextIn introOut={introOut}>
                <p>scroll</p>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <p> to explore</p>
              </HeroTextIn>
            </div>
          </div>
          <h1 className={cn(s.description, 'p-s')}>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">Explore the protocols, culture, builders</p>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">and onchain history that shaped Base</p>
            </HeroTextIn>
          </h1>
          <HeroTextIn introOut={introOut}>
            <p className={cn('p-xs', s.tm, s.tmMobile)}>
              <span>©</span> {new Date().getFullYear()} {site.name}
            </p>
          </HeroTextIn>
          <div className={cn(s.ctaGroup, introOut && s.in)}>
            <Button
              className={cn(s.cta, s.ctaCompact)}
              arrow
              icon={<AgentIcon />}
              href="/agent"
            >
              Ask the agent
            </Button>
            <Button
              className={cn(s.cta, s.ctaCompact)}
              arrow
              icon={<Docs />}
              href="/docs"
            >
              View documentation
            </Button>
            <Button
              className={cn(s.cta, s.ctaCompact)}
              arrow
              icon={<User />}
              href="/about"
            >
              About me
            </Button>
            <Button
              className={cn(s.cta, s.ctaCompact)}
              arrow
              icon={<GitHub />}
              href={site.github}
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </section>
      <section className={s.why} data-lenis-scroll-snap-align="start">
        <div className="layout-grid">
          <h2 className={cn(s.sticky, 'h2')}>
            <AppearTitle>Why document Base?</AppearTitle>
          </h2>
          <aside className={s.features} ref={whyRectRef}>
            <div className={s.feature}>
              <p className="p">
                Every major technological movement deserves a museum. Base is
                more than an L2 — it is a living archive of builders, protocols,
                culture, and onchain history. This exhibition traces how a
                vision became a global ecosystem.
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                History &amp; evolution
              </h3>
              <p className="p">
                From announcement to mainnet, from Onchain Summer to AI agents —
                each milestone marks a chapter in how Base scaled from idea to
                one of the most active ecosystems onchain.
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                Culture &amp; community
              </h3>
              <p className="p">
                Memes, viral launches, community events, and onchain movements
                shaped the identity of Base. Culture is not decoration — it is
                the force that brings millions into the fold.
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                AI agents &amp; the next chapter
              </h3>
              <p className="p">
                Autonomous agents are writing a new layer of the story. From
                trading assistants to onchain copilots, AI on Base represents
                the frontier of what an ecosystem can become.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className={s.rethink}>
        <div className={cn('layout-grid', s.pre)}>
          <div className={s.highlight} data-lenis-scroll-snap-align="start">
            <Parallax speed={-0.5}>
              <p className="h2">
                <AppearTitle>Ecosystem Timeline</AppearTitle>
              </p>
            </Parallax>
          </div>
          <div className={s.comparison}>
            <Parallax speed={0.5}>
              <p className="p">
                Walk through the milestones that defined Base — from{' '}
                <Link className="contrast semi-bold" href="https://base.org">
                  the original announcement
                </Link>{' '}
                to{' '}
                <Link
                  className="contrast semi-bold"
                  href="https://www.base.org/blog/onchain-summer"
                >
                  Onchain Summer
                </Link>{' '}
                and the rise of AI agents. Each moment expanded what onchain
                culture could be.
              </p>
            </Parallax>
          </div>
        </div>
        <div className={s.cards} ref={cardsRectRef}>
          <HorizontalSlides>
            {timeline.map(({ number, text }) => (
              <Card key={number} className={s.card} number={number} text={text} />
            ))}
          </HorizontalSlides>
        </div>
      </section>
      <section
        ref={(node) => {
          zoomWrapperRectRef(node)
          zoomRef.current = node
        }}
        className={s.solution}
      >
        <div className={s.inner}>
          <div className={s.zoom}>
            <h2 className={cn(s.first, 'h1 vh')}>
              so we built <br />
              <span className="contrast">onchain culture</span>
            </h2>
            <h2 className={cn(s.enter, 'h3 vh')}>
              <Link href={site.twitter} className={s.enterLink}>
                {scrollCta.line1} <br />
                <span className="contrast">{scrollCta.handle}</span>
              </Link>
            </h2>
            <h2 className={cn(s.second, 'h1 vh')}>Of Base</h2>
          </div>
        </div>
      </section>
      <section className={cn('theme-light', s.featuring)} ref={whiteRectRef}>
        <div className={s.inner}>
          <div className={cn('layout-block', s.intro)}>
            <p className="p-l">
              Base is an{' '}
              <Link className="contrast semi-bold" href="https://base.org">
                open ecosystem
              </Link>{' '}
              built to bring the world onchain — DeFi, social, gaming, AI agents,
              and consumer apps united on a secure, low-cost L2. This gallery
              maps the protocols that power it.
            </p>
          </div>
        </div>
        <section ref={featuresRectRef}>
          <FeatureCards />
        </section>
      </section>
      <section
        ref={(node) => {
          inuseRectRef(node)
          inUseRef.current = node
        }}
        className={cn('theme-light', s['in-use'], visible && s.visible)}
      >
        <div className="layout-grid">
          <aside className={s.title}>
            <p className="h3">
              <AppearTitle>
                Builders
                <br />
                <span className="grey">of Base</span>
              </AppearTitle>
            </p>
          </aside>
          <ul className={s.list}>
            {projects.map(({ title, source, href }, i) => (
              <li key={i}>
                <ListItem
                  title={title}
                  source={source}
                  href={href}
                  index={i}
                  visible={visible}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}
