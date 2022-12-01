import clsx from 'clsx'
import {Link} from 'common/Link'
import {Fragment, memo} from 'react'

export const BreadcrumbItem = memo(function BreadcrumbItem(props: {
  className?: string
  label: string
  last: boolean
  link?: string
  position: number
}) {
  return (
    <Fragment>
      <li
        className={clsx('whitespace-nowrap', props.className)}
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem"
      >
        {props.link && (
          <Link href={props.link} itemProp="item">
            <span itemProp="name">{props.label}</span>
          </Link>
        )}

        {!props.link && (
          <span itemProp="item">
            <span itemProp="name" className="text-ffffff">
              {props.label}
            </span>
          </span>
        )}

        <meta itemProp="position" content={`${props.position}`} />
      </li>

      {!props.last && <span>/</span>}
    </Fragment>
  )
})
