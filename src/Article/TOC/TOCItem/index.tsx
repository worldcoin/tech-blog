import clsx from 'clsx'
import {TOCHeading} from 'common/types'
import {memo} from 'react'
import {Link} from 'react-scroll'

export const TOCItem = memo(function TOCItem(
  props: {
    className?: string
    active?: boolean
  } & TOCHeading,
) {
  return (
    <li className={clsx('relative overflow-hidden pl-6 text-14')}>
      <Link
        className={clsx(props.className, 'transition-colors', {
          'text-70868f hover:text-7068fa/75 hover:underline': !props.active,
          'underline text-7068fa': props.active,
        })}
        to={props.id}
        href={`#${props.id}`}
        smooth
        offset={-128}
      >
        {props.title}
      </Link>
    </li>
  )
})
