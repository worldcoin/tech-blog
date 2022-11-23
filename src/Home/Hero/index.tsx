import clsx from 'clsx'
import {ArrowLink} from 'common/ArrowLink'
import {layout} from 'common/styles'
import Image from 'next/image'
import heroImage from 'public/images/hero.svg'
import {memo} from 'react'

export const Hero = memo(function Hero() {
  return (
    <section
      className={clsx(
        layout.paddingHorizontal,
        'grid min-h-[calc(100vh-68px)] lg:min-h-[unset] py-25 border-b border-b-010101/10',
        'gap-6 content-start',
        '2xl:grid-flow-col 2xl:auto-cols-max 2xl:justify-between 2xl:text-left 2xl:gap-25 2xl:items-center',
      )}
    >
      <div className="space-y-4 2xl:space-y-9 w-min grid justify-items-center 2xl:justify-items-start">
        <h1 className="text-26 md:text-32 2xl:text-42 whitespace-nowrap">The Worldcoin Tech Blog</h1>

        <h2 className="text-596673 text-16 md:text-20 2xl:pr-25">
          Completely free resource for blockchain technology and community services
        </h2>

        {/* FIXME: add link */}
        <ArrowLink href="#!" className="text-7068fa text-20">
          Start reading
        </ArrowLink>
      </div>
      <div className="-order-1 2xl:order-1">
        <Image src={heroImage} alt="The Worldcoin Tech Blog" />
      </div>
    </section>
  )
})
