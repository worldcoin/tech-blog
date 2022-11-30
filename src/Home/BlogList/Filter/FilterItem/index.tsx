import clsx from 'clsx'
import {BlogListFilter, BlogListFilterValues} from 'Home/BlogList'
import {Dispatch, memo, SetStateAction} from 'react'

export const FilterItem = memo(function Item(props: {
  category: BlogListFilter['category'][number]
  className?: string
  current?: boolean
  onClick?: Dispatch<SetStateAction<BlogListFilterValues['category']>>
}) {
  return (
    <li
      className={clsx('text-center text-18 leading-[1.5]', props.className, {
        'bg-29343f text-ffffff': props.current,
        'bg-010101/5 text-010101': !props.current,
      })}
    >
      <button className="px-10 py-2.5 whitespace-nowrap" onClick={() => props.onClick?.(props.category.value)}>
        {props.category.title}
      </button>
    </li>
  )
})
