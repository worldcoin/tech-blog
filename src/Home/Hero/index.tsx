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
        'grid py-25 border-b border-010101/10 dark:border-ffffff/10',
        'content-start justify-items-center',
        'md:grid-flow-col md:auto-cols-max md:justify-between md:items-center',
      )}
    >
      <div className="space-y-4 2xl:space-y-9 w-min grid justify-items-center md:justify-items-start text-center md:text-left">
        <h1 className="text-26 md:text-32 2xl:text-42 whitespace-nowrap">The Worldcoin Tech Blog</h1>

        <h2 className="text-596673 text-16 md:text-20 md:pr-25">
          Completely free resource for blockchain technology and community services
        </h2>

        {/* FIXME: add link */}
        <ArrowLink href="#!" className="text-7068fa text-20">
          Start reading
        </ArrowLink>
      </div>
      <div className="-order-1 md:order-1">
        <Image src={heroImage} alt="The Worldcoin Tech Blog" />
      </div>
    </section>
  )
})
