import clsx from 'clsx'
import {memo} from 'react'
import {BreadcrumbItem} from './Item'

export const Breadcrumbs = memo(function Breadcrumbs(props: {
  className?: string
  itemClassName?: string
  items: Array<{label: string; link?: string}>
}) {
  if (props.items.length <= 0) {
    return null
  }

  return (
    <nav>
      <ul
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className={clsx('flex flex-wrap gap-x-2', props.className)}
      >
        {props.items.map((item, index) => (
          <BreadcrumbItem
            key={index}
            {...item}
            position={index + 1}
            last={index === props.items.length - 1}
            className={props.itemClassName}
          />
        ))}
      </ul>
    </nav>
  )
})
