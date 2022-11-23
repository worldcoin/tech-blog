import clsx from 'clsx'
import {Icon} from 'common/Icon'
import {Link} from 'common/Link'
import {Fragment, memo, ReactNode} from 'react'
import {Link as ScrollLink} from 'react-scroll'

type ArrowLinkCommonProps = {
  className?: string
  children: ReactNode
}

type ArrowLinkWithHrefProps = ArrowLinkCommonProps & {
  href: string
  to?: never
  smooth?: never
  duration?: never
  target?: string
}

type ArrowLinkWithToProps = ArrowLinkCommonProps & {
  href?: never
  to: string
  smooth?: boolean
  duration?: number
}

type ArrowLinkProps = ArrowLinkWithHrefProps | ArrowLinkWithToProps

const isArrowLinkWithHrefProps = (props: ArrowLinkProps): props is ArrowLinkWithHrefProps => {
  return 'href' in props
}

export const ArrowLink = memo(function ArrowLink(props: ArrowLinkWithHrefProps | ArrowLinkWithToProps) {
  const className = clsx(
    'group grid gap-x-2 grid-cols-auto/1fr justify-start items-center',
    'font-medium hover:underline transition-all cursor-pointer',
    props.className,
  )

  const children = (
    <Fragment>
      <span>{props.children}</span>

      <Icon name="arrow-right" className="w-3.5 h-3.5 lg:group-hover:translate-x-1.5 transition-transform" />
    </Fragment>
  )

  if (isArrowLinkWithHrefProps(props)) {
    return (
      <Link className={className} href={props.href} {...(props.target && {target: props.target})}>
        {children}
      </Link>
    )
  }

  return (
    <ScrollLink className={className} to={props.to} href="#" smooth={props.smooth} duration={props.duration}>
      {children}
    </ScrollLink>
  )
})
