import clsx from 'clsx'
import {layout} from 'common/styles'
import {memo, ReactNode} from 'react'

export const Hero = memo(function Hero(props: {
  children: ReactNode
  className?: string
  contentClassName?: string
  image?: ReactNode
  alt?: string
}) {
  return (
    <section className={clsx('relative overflow-hidden bg-010101 text-ffffff', props.className)}>
      <div
        className={clsx(
          layout.paddingHorizontal,
          'relative z-10 grid h-full content-start md:content-center',
          props.contentClassName,
        )}
      >
        {props.children}
      </div>

      {props.image && (
        <div className={clsx(layout.paddingRight2xl, 'z-0 absolute inset-0')}>
          <div className="relative w-full h-full">{props.image}</div>
        </div>
      )}
    </section>
  )
})
