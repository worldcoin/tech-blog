import clsx from 'clsx'
import {memo, ReactNode} from 'react'

export const Section = memo(function Section(props: {children: ReactNode; className?: string; title: string}) {
  return (
    <div className={clsx('grid gap-y-4 lg:gap-y-3 content-start justify-items-start font-book', props.className)}>
      <div className="mb-2 text-000000">{props.title}</div>
      {props.children}
    </div>
  )
})
