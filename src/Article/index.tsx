import clsx from 'clsx'
import {renderReadTime} from 'common/helpers'
import {Hero} from 'common/Hero'
import {SocialLink} from 'common/SocialLink'
import {layout} from 'common/styles'
import {BlogPageProps} from 'common/types'
import dayjs from 'dayjs'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {Fragment, memo, useMemo, useRef} from 'react'
import {Breadcrumbs} from './Breadcrumbs'
import {Popular} from './Popular'
import {Prose} from './Prose'
import {TOC} from './TOC'
import planetsLeft from '/public/images/planets-left.svg'
import planetsMobile from '/public/images/planets-mobile.svg'
import planetsRight from '/public/images/planets-right.svg'
const linkClassName = 'text-ffffff/40 hover:text-ffffff transition-colors w-[15px] h-[15px] md:w-5 md:h-5'
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
      <article className="mb-17 md:mb-64">
        <Hero
          className="pt-24 pb-40 md:pt-40 md:pb-24"
          contentClassName={layoutClassName}
          image={
            <Fragment>
              <Image src={planetsLeft} alt="" priority className="absolute left-0 bottom-0 hidden md:block" />
              <Image src={planetsRight} alt="" priority className="absolute right-0 bottom-0 hidden md:block" />
              <Image src={planetsMobile} alt="" priority className="absolute right-0 bottom-0 md:hidden" />
            </Fragment>
          }
        >
          <div className="col-start-2">
            <Breadcrumbs
              className="text-ffffff/40"
              items={[{label: 'Tech Blog', link: '/'}, {label: props.meta.title}]}
            />

            <h1 className="font-bold text-28 md:text-42 mt-2.5 md:mt-5">{props.meta.title}</h1>

            <div className="grid md:grid-flow-col justify-between gap-2.5 md:gap-5 mt-5 md:mt-2">
              <div className="space-x-1">
                <span className="text-ffffff/40">Author:</span>
                <span>{props.meta.author?.name}</span>
              </div>

              <div className="flex gap-5 items-center">
                <span className="text-ffffff/40">Share</span>

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
        </Hero>

        <section className={clsx(layout.paddingHorizontal, layoutClassName, 'pt-6.5 md:pt-15')}>
          <aside>
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

          <aside>
            <div className="sticky top-32">
              <Popular posts={props.relatedPosts} />
            </div>
          </aside>
        </section>
      </article>
    </Fragment>
  )
})
