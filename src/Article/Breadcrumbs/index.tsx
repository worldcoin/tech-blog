import {memo} from 'react'
import {BreadcrumbItem} from './Item'

export const Breadcrumbs = memo(function Breadcrumbs(props: {items: Array<{label: string; link?: string}>}) {
  if (props.items.length <= 0) {
    return null
  }

  return (
    <nav>
      <ul
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex flex-wrap gap-2 text-70868f dark:text-ffffff/40"
      >
        {props.items.map((item, index) => (
          <BreadcrumbItem key={index} {...item} position={index + 1} last={index === props.items.length - 1} />
        ))}
      </ul>
    </nav>
  )
})
