import clsx from 'clsx'
import {renderReadTime} from 'common/helpers'
import {SocialLink} from 'common/SocialLink'
import {layout} from 'common/styles'
import {BlogPageProps} from 'common/types'
import dayjs from 'dayjs'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {Fragment, memo, useMemo, useRef} from 'react'
import {Breadcrumbs} from './Breadcrumbs'
import {Popular} from './Popular'
import {Prose} from './Prose'
import {TOC} from './TOC'
import planetsDarkLeft from '/public/images/planets-dark-left.svg'
import planetsDarkRight from '/public/images/planets-dark-right.svg'
import planetsLightLeft from '/public/images/planets-light-left.svg'
import planetsLightRight from '/public/images/planets-light-right.svg'
const linkClassName =
  'text-9eafc0 hover:text-8e87ff dark:text-ffffff/40 dark:hover:text-ffffff transition-colors w-[15px] h-[15px] md:w-5 md:h-5'
const layoutClassName = 'grid md:grid-cols-1/2/1 gap-2 md:gap-8'

export const Article = memo(function Article(props: BlogPageProps) {
  const router = useRouter()
  const contentRef = useRef<HTMLElement>(null)

  const shareUrl = useMemo(
    () => encodeURI(new URL(router.asPath, process.env.NEXT_PUBLIC_APP_URL).toString()),
    [router.asPath],
  )

  return (
    <Fragment>
      <Head>
        {[planetsLightLeft, planetsLightRight, planetsDarkLeft, planetsDarkRight].map(({src}, index) => (
          <link rel="preload" href={src} as="image" key={`preload-article-${index}`} />
        ))}
      </Head>

      <article className="mb-17 md:mb-64">
        <header className="grid relative max-h-[calc(100vh-68px)] min-h-[384px]">
          <div className={clsx(layout.paddingHorizontal, layoutClassName, 'relative z-10 items-center')}>
            <div className="space-y-2.5 md:space-y-2 md:col-start-2 text-14 md:text-16">
              <Breadcrumbs items={[{label: 'Tech Blog', link: '/'}, {label: props.meta.title}]} />
              <h1 className="font-bold text-28 md:text-42">{props.meta.title}</h1>

              <div className="grid md:grid-flow-col justify-between gap-2.5 md:gap-5 mt-5 md:mt-2">
                <div className="space-x-1">
                  <span className="text-70868f dark:text-ffffff/40">Author:</span>
                  <span>{props.meta.author?.name}</span>
                </div>

                <div className="flex gap-5 items-center">
                  <span className="text-70868f dark:text-ffffff/40">Share</span>

                  <SocialLink
                    href={`http://twitter.com/share?url=${shareUrl}`}
                    icon="twitter"
                    className={linkClassName}
                  />

                  <SocialLink
                    href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    icon="facebook"
                    className={linkClassName}
                  />

                  <SocialLink
                    href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    icon="linkedin"
                    className={linkClassName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="z-0 absolute inset-0">
            <div className="absolute left-0 h-full hidden md:block">
              <img src={planetsLightLeft.src} alt="" className="dark:hidden" />
              <img src={planetsDarkLeft.src} alt="" className="hidden dark:block" />
            </div>

            <div className="absolute right-0 h-full opacity-20 sm:opacity-100">
              <img src={planetsLightRight.src} alt="" className="dark:hidden" />
              <img src={planetsDarkRight.src} alt="" className="hidden dark:block" />
            </div>
          </div>
        </header>

        <section className={clsx(layout.paddingHorizontal, layoutClassName)}>
          <aside className="mt-6.5 md:mt-0">
            <div className="sticky top-32 space-y-13">
              <div className="grid gap-2 text-12">
                <span>
                  {dayjs().format('MMMM DD, YYYY')} (Updated {dayjs().format('MMM DD YYYY')})
                </span>

                {props.meta.readTime && (
                  <span className="text-70868f capitalize">{renderReadTime(props.meta.readTime)}</span>
                )}
              </div>

              <TOC toc={props.toc} contentRef={contentRef} />
            </div>
          </aside>

          <main ref={contentRef} className="min-w-0 mt-12 md:mt-0 border-b border-afafaf md:border-transparent">
            <Prose>{props.children}</Prose>
          </main>

          <aside className="mt-17 md:mt-0">
            <div className="sticky top-32">
              <Popular posts={props.relatedPosts} />
            </div>
          </aside>
        </section>
      </article>
    </Fragment>
  )
})
