import clsx from 'clsx'
import {Cta} from 'common/Cta'
import {layout} from 'common/styles'
import {SubscribeForm} from 'common/SubscribeForm'
import {MenuItem} from 'common/types'
import {memo, ReactNode} from 'react'
import {Footer} from './Footer'
import {Header} from './Header'

export type LayoutProps = {
  children: ReactNode
  footerBorder?: boolean
  menuItems: Array<MenuItem>
}

export const Layout = memo(function Layout(props: LayoutProps) {
  return (
    <div
      className={clsx(
        'grid grid-rows-auto/1fr/auto min-h-screen selection:text-ffffff selection:bg-4940e0 bg-ffffff text-010101',
      )}
    >
      <Header menuItems={props.menuItems} />
      {props.children}

      <section
        className={clsx(
          'flex flex-col gap-12 md:gap-0 md:flex-row justify-between items-center py-28',
          'bg-dde7ea text-010101 text-center md:text-left',
          layout.paddingHorizontal,
        )}
      >
        <p className="text-24 md:text-32">
          Stay up to date with <br className="hidden md:inline" /> all things crypto.
        </p>

        <SubscribeForm
          className="text-20"
          inputClassName="!text-20 min-w-[0px] md:min-w-[428px]"
          placeholder="Enter email"
          underline="field"
          variant="cta"
        />
      </section>

      {/* FIXME: add link */}
      <Cta href={'#!'} text={'Faq'} className="bg-010101 text-ffffff">
        Have questions?
      </Cta>

      <Footer footerBorder={props.footerBorder} />
    </div>
  )
})
