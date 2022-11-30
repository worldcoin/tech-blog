import clsx from 'clsx'
import {ArrowLink} from 'common/ArrowLink'
import {layout} from 'common/styles'
import Image from 'next/image'
import heroImageDark from 'public/images/hero-dark.svg'
import {memo} from 'react'

const title = 'The Worldcoin Tech Blog'

export const Hero = memo(function Hero() {
  return (
    <section className="relative overflow-hidden bg-010101 text-ffffff border-b border-010101/10 max-h-[calc(100vh_-_68px)] min-h-[610px] pt-[104px] md:pt-17 pb-38 md:pb-0">
      <div
        className={clsx(
          layout.paddingHorizontal,
          'relative z-10 grid h-full gap-15 md:gap-9 content-start md:content-center',
        )}
      >
        <div className="md:w-min space-y-7.5 md:space-y-5">
          <h1 className="text-36 md:text-42 md:whitespace-nowrap font-bold xl:pr-13">{title}</h1>

          <h2 className="text-20 md:text-24 font-serif tracking-[-0.005em]">
            Completely free resource for blockchain technology and community services
          </h2>
        </div>

        {/* FIXME: add link */}
        <ArrowLink href="#!" className="text-7068fa text-18 md:text-20">
          Start reading
        </ArrowLink>
      </div>

      <div className={clsx(layout.paddingRight2xl, 'z-0 absolute right-0 bottom-0')}>
        <Image src={heroImageDark} alt={title} priority className="translate-x-[15%] md:translate-x-0" />
      </div>
    </section>
  )
})
