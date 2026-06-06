import cn from 'clsx'
import { Button } from 'components/button'
import { Link } from 'components/link'
import { footerNav, site } from 'content/museum'
import GitHub from 'icons/github.svg'
import s from './footer.module.scss'

export const Footer = ({ compact = false }) => {
  return (
    <footer className={cn('theme-light', s.footer, compact && s.compact)}>
      {!compact && (
        <>
          <div className={cn(s.top, 'layout-grid hide-on-mobile')}>
            <p className={cn(s['first-line'], 'h1')}>
              The future of <br />
              <span className="contrast">Base</span>
            </p>
            <p className={cn(s['last-line'], 'h1')}>
              open to <span className="hide-on-desktop">&nbsp;</span> innovation,{' '}
              <br /> agents &amp; builders &nbsp;
            </p>
            <Button
              className={s.cta}
              arrow
              icon={<GitHub />}
              href={site.github}
            >
              View on GitHub
            </Button>
          </div>
          <div className={cn(s.top, 'layout-block hide-on-desktop')}>
            <p className={cn(s['first-line'], 'h1')}>
              The future of <br />
              <span className="contrast">Base</span>
              <br /> open to <br /> innovation, agents &amp; builders
            </p>
          </div>
        </>
      )}

      <div className={cn(s.sitemap, 'layout-block')}>
        <div className={s.brand}>
          <p className={cn('h4', s.brandName)}>{site.name}</p>
          <p className={cn('p-xs', s.brandTagline)}>{site.title}</p>
          <p className={cn('p-xs', s.copyright)}>
            <span>©</span> {new Date().getFullYear()} {site.name}
          </p>
        </div>

        <div className={s.columns}>
          {footerNav.map(({ title, links }) => (
            <div key={title} className={s.column}>
              <p className={cn('p-xs', s.columnTitle)}>{title}</p>
              <ul className={s.columnLinks}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link className={cn('p-xs', s.columnLink)} href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
