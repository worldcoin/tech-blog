import clsx from 'clsx'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
import {CSSProperties, memo, ReactNode, useMemo} from 'react'

export const Link = memo(function Link(props: {
  activeClassName?: string
  as?: string
  children: ReactNode
  className?: string
  href: string
  inactiveClassName?: string
  onClick?: () => void
  rel?: string
  style?: CSSProperties
  target?: string
  title?: string
}) {
  const router = useRouter()
  const hasClassName = props.className || props.activeClassName || props.inactiveClassName

  const linkClassName = useMemo(() => {
    if (!hasClassName) {
      return ''
    }

    return clsx(
      props.className,
      {[props.activeClassName as string]: props.activeClassName && router && router.pathname === props.href},
      {[props.inactiveClassName as string]: props.inactiveClassName && router && router.pathname !== props.href},
    )
  }, [hasClassName, props.activeClassName, props.className, props.href, props.inactiveClassName, router])

  return (
    <NextLink
      {...(props.as && {as: props.as})}
      href={props.href}
      className={linkClassName}
      rel={props.rel}
      onClick={props.onClick}
      title={props.title}
      {...(props.target && {target: props.target})}
      {...(props.style && {style: props.style})}
    >
      {props.children}
    </NextLink>
  )
})
