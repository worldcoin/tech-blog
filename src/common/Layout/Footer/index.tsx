import clsx from 'clsx'
import {Icon} from 'common/Icon'
import {Link as CommonLink} from 'common/Link'
import {SocialLink} from 'common/SocialLink'
import {layout} from 'common/styles'
import {SubscribeForm} from 'common/SubscribeForm'
import dayjs from 'dayjs'
import getConfig from 'next/config'
import {memo} from 'react'
import {Link} from './Link'
import {Section} from './Section'
const {publicRuntimeConfig} = getConfig()
const estimatedYear = 2021
const currentYear = Number(dayjs().format('YYYY'))
const linkClassName = 'text-8c8c92 hover:text-000000'

export const Footer = memo(function Footer(props: {className?: string; footerBorder?: boolean}) {
  return (
    <footer
      className={clsx(
        layout.paddingHorizontal,
        props.className,
        'grid gap-y-5 lg:gap-y-12 grid-cols-1fr/auto lg:grid-cols-auto/1fr/auto content-end text-14',
        'pt-15 lg:pt-16 pb-5 lg:pb-10',
        {'mt-28 lg:mt-40 border-t border-e8e8ea': props.footerBorder},
      )}
    >
      <CommonLink className="lg:col-start-1 lg:row-start-3 lg:mt-44 mb-8 lg:mb-0 w-min" href="/">
        <Icon name="logo-small" className="w-10 lg:w-12 h-10 lg:h-12" />
      </CommonLink>

      <div
        className={clsx(
          'col-start-1 lg:row-span-2 row-start-2 lg:row-start-1 grid lg:gap-x-14 gap-y-10 lg:grid-flow-col auto-cols-max',
          'lg:pl-1 text-8c8c92',
        )}
      >
        <Section title="Explore">
          <Link href="/">Home</Link>
          <Link href="/sign-up">Sing Up</Link>
          {/* FIXME: add link */}
          <Link href="#!">Become a Worldcoin Partner</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/blog">Blog</Link>
        </Section>

        <Section title="Company">
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/press">Press</Link>
        </Section>
      </div>

      <div
        className={clsx(
          'col-span-2 lg:col-span-1 col-start-1 lg:col-start-3 lg:row-start-1 mt-9 lg:mt-0 grid lg:gap-y-4.5',
        )}
      >
        <p className="hidden lg:block text-14 font-book">Get Updates</p>
        <SubscribeForm placeholder="Email Address" className="text-8c8c92" inputClassName="placeholder-8c8c92" />
      </div>

      <div
        className={clsx(
          'col-start-2 lg:col-start-3 row-start-2',
          'grid lg:gap-y-6 justify-items-start pr-4 lg:pr-0 leading-normal',
        )}
      >
        <p className="hidden lg:block text-14 font-book">Community</p>

        <div
          className={clsx(
            'justify-self-end grid gap-7 auto-rows-min content-between',
            'lg:col-start-1 lg:place-self-end lg:justify-self-start lg:gap-x-10.5 lg:grid-flow-col',
          )}
        >
          <SocialLink href="https://twitter.com/worldcoin" icon="twitter" className={linkClassName} />
          <SocialLink href="https://discord.gg/worldcoin" icon="discord" className={linkClassName} />

          <SocialLink
            href="https://www.facebook.com/Worldcoin-102231972238962"
            icon="facebook"
            className={linkClassName}
          />

          <SocialLink href="https://instagram.com/worldcoin/" icon="instagram" className={linkClassName} />

          <SocialLink
            href="https://www.youtube.com/channel/UCokOstyncOgi1VvhE-U7aXA"
            icon="youtube"
            className={linkClassName}
          />

          <SocialLink href="https://t.me/worldcoin" icon="telegram" className={linkClassName} />
          <SocialLink href="https://www.tiktok.com/@worldcoin" icon="tiktok" className={linkClassName} />
          <SocialLink href="https://github.com/worldcoin" icon="github" className={linkClassName} />

          <SocialLink
            href="https://www.linkedin.com/company/worldcoinfoundation"
            icon="linkedin"
            className={linkClassName}
          />
        </div>
      </div>

      <div
        className={clsx(
          'col-span-2 lg:col-span-1 place-content-between justify-start items-center leading-5 text-8c8c92',
          'lg:col-start-3 lg:row-start-3 lg:self-end grid gap-3 lg:gap-x-4 grid-flow-col lg:justify-end',
        )}
      >
        <span>
          © {estimatedYear}
          {currentYear > estimatedYear && `-${currentYear}`} Worldcoin
        </span>

        <div className="w-0.5 h-0.5 bg-8c8c92 rounded-full" />

        {/* FIXME: add link */}
        <Link href={`${publicRuntimeConfig.NEXT_PUBLIC_PRIVACY_STATEMENT_URL}`} target="_blank">
          Privacy
        </Link>

        <div className="w-0.5 h-0.5 bg-8c8c92 rounded-full" />

        {/* FIXME: add link */}
        <Link href={`${publicRuntimeConfig.NEXT_PUBLIC_USER_AGREEMENT_URL}`} target="_blank">
          Terms
        </Link>

        {/* FIXME: add link */}
        <Link href={`#!`} target="_blank">
          Support
        </Link>
      </div>
    </footer>
  )
})
