import clsx from 'clsx'
import {ArrowLink} from 'common/ArrowLink'
import {layout} from 'common/styles'
import Image from 'next/image'
import heroImageDark from 'public/images/hero-dark.svg'
import heroImageLight from 'public/images/hero-light.svg'
import {memo} from 'react'

const title = 'The Worldcoin Tech Blog'

export const Hero = memo(function Hero() {
  return (
    <section className="relative border-b border-010101/10 dark:border-ffffff/10 max-h-[calc(100vh_-_68px)] min-h-[610px]">
      <div
        className={clsx(
          layout.paddingHorizontal,
          'relative z-10 py-25 grid h-full gap-4 md:gap-9 text-center md:text-left content-start md:content-center',
          'justify-center md:justify-start justify-items-center md:justify-items-start',
        )}
      >
        <div className="w-min space-y-2 md:space-y-5">
          <h1 className="text-26 md:text-42 whitespace-nowrap font-bold xl:pr-13">{title}</h1>

          <h2 className="text-626467 dark:text-ffffff text-18 md:text-24 font-serif tracking-[-0.005em]">
            Completely free resource for blockchain technology and community services
          </h2>
        </div>

        {/* FIXME: add link */}
        <ArrowLink href="#!" className="text-7068fa text-20">
          Start reading
        </ArrowLink>
      </div>

      <div className={clsx(layout.paddingRight2xl, 'z-0 absolute right-0 bottom-0 opacity-50 md:opacity-100')}>
        <Image src={heroImageLight} alt={title} className="block dark:hidden" priority />
        <Image src={heroImageDark} alt={title} className="hidden dark:block" priority />
      </div>
    </section>
  )
})
