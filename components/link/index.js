import NextLink from 'next/link'
import { forwardRef, useMemo } from 'react'

const SHALLOW_URLS = ['?demo=true']

export const Link = forwardRef(
  ({ href, children, className, scroll, shallow, ...props }, ref) => {
    const attributes = {
      ref,
      className,
      ...props,
    }

    const isProtocol = useMemo(
      () => href?.startsWith('mailto:') || href?.startsWith('tel:'),
      [href]
    )

    const needsShallow = useMemo(
      () => !!SHALLOW_URLS.find((url) => href?.includes(url)),
      [href]
    )

    const isExternal = useMemo(() => href?.startsWith('http'), [href])

    if (typeof href !== 'string') {
      return <button {...attributes}>{children}</button>
    }

    if (href.startsWith('#')) {
      return (
        <a {...attributes} href={href}>
          {children}
        </a>
      )
    }

    if (isProtocol || isExternal) {
      return (
        <a
          {...attributes}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    }

    return (
      <NextLink
        href={href}
        scroll={scroll}
        shallow={needsShallow || shallow}
        {...attributes}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'
