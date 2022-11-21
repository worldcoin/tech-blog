import clsx from 'clsx'
import {MenuItem} from 'common/types'
import {memo, ReactNode} from 'react'
import {Footer} from './Footer'
import {Header} from './Header'

export type LayoutProps = {
  children: ReactNode
  isAlt?: boolean
  isTransparent?: boolean
  menuItems: Array<MenuItem>
  footerBorder?: boolean
}

export const Layout = memo(function Layout(props: LayoutProps) {
  return (
    <div
      className={clsx(
        'grid grid-rows-auto/1fr/auto min-h-screen selection:text-ffffff selection:bg-4940e0 bg-ffffff dark:bg-010101 text-010101 dark:text-ffffff',
        {
          'pt-[68px]': !props.isAlt,
        },
      )}
    >
      <Header menuItems={props.menuItems} />

      {props.children}
      <Footer footerBorder={props.footerBorder} />
    </div>
  )
})
