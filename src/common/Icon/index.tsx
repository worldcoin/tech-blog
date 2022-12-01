import clsx from 'clsx'
import {CSSProperties, memo} from 'react'
import styles from './icon.module.css'

const iconNames = [
  'arrow-right',
  'check',
  'discord',
  'exclamation-mark',
  'facebook',
  'github',
  'instagram',
  'linkedin',
  'logo-small',
  'logo',
  'telegram',
  'tiktok',
  'triangle',
  'twitter',
  'youtube',
] as const

export type IconType = typeof iconNames[number]

export const Icon = memo(function Icon(
  props: {
    className?: string
    noMask?: boolean
    testId?: string
  } & (
    | {
        name: IconType
        path?: never
      }
    | {
        name?: never
        path: string
      }
  ),
) {
  return (
    <span
      className={clsx(
        styles.icon,
        'pointer-events-none flex',

        {
          'bg-current': !props.noMask,
          'no-mask': props.noMask,
        },

        props.className,
      )}
      {...(props.testId && {'data-testid': props.testId})}
      role="icon"
      style={
        {
          '--image': `url("${props.path ?? `/icons/${props.name}.svg`}")`,
        } as CSSProperties
      }
    />
  )
})
