import {Link} from 'common/Link'
import {Fragment, memo} from 'react'

export const BreadcrumbItem = memo(function BreadcrumbItem(props: {
  label: string
  link?: string
  position: number
  last: boolean
}) {
  return (
    <Fragment>
      <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="whitespace-nowrap">
        {props.link && (
          <Link href={props.link} itemProp="item">
            <span itemProp="name">{props.label}</span>
          </Link>
        )}

        {!props.link && (
          <span itemProp="item">
            <span itemProp="name" className="text-010101 dark:text-ffffff">
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
