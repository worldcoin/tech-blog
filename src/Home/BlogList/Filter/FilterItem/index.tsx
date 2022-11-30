import clsx from 'clsx'
import {BlogListFilterValues} from 'Home/BlogList'
import {memo, ReactNode} from 'react'

type Value = BlogListFilterValues['category']

export const FilterItem = memo(function Item(props: {
  children: ReactNode
  className?: string
  onClick?: (arg?: Value) => void
  value?: Value
  active?: boolean
}) {
  return (
    <button
      className={clsx(
        'text-18 text-left md:text-center py-2.5 w-full px-4.5 md:px-18',
        {
          'bg-29343f text-ffffff': props.active,
          'bg-f9f9f9': !props.active,
        },
        props.className,
      )}
      onClick={() => props.onClick?.(props.value)}
    >
      {props.children}
    </button>
  )
})
