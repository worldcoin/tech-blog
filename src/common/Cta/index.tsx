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
        'flex justify-between items-center gap-y-8 w-full py-7 lg:py-7.5',
        layout.paddingHorizontal,
        props.className,
      )}
    >
      <span className={clsx({'text-18 md:text-24 font-medium': !props.textClassName}, props.textClassName)}>
        {props.children}
      </span>

      <ArrowLink className="text-18 md:text-20 font-medium" href={props.href}>
        {props.text}
      </ArrowLink>
    </div>
  )
})
