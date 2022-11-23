import clsx from 'clsx'
import {ArrowLink} from 'common/ArrowLink'
import {layout} from 'common/styles'
import {memo, ReactNode} from 'react'

export const Cta = memo(function Cta(props: {
  href: string
  text: string
  children: ReactNode
  className?: string
  textClassName?: string
}) {
  return (
    <div
      className={clsx(
        'grid gap-y-8 md:grid-cols-1fr/auto justify-center md:justify-items-start w-full py-7 lg:py-7.5',
        'justify-items-center items-center',
        layout.paddingHorizontal,
        props.className,
      )}
    >
      <span className={clsx({'text-24 font-medium': !props.textClassName}, props.textClassName)}>{props.children}</span>

      <ArrowLink className="text-18 font-medium" href={props.href}>
        {props.text}
      </ArrowLink>
    </div>
  )
})
