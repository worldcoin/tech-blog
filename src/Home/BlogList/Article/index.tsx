import {ArrowLink} from 'common/ArrowLink'
import {PageMeta} from 'common/types/page-meta'
import dayjs from 'dayjs'
import Image from 'next/image'
import {memo} from 'react'

export const Article = memo(function Article(props: {post: PageMeta}) {
  return (
    <article className="space-y-12 pt-20" itemScope itemType="https://schema.org/BlogPosting">
      <div className="grid md:grid-cols-[2fr_1fr] justify-between gap-8 md:gap-16 2xl:gap-32">
        <div className="space-y-5">
          <div className="flex gap-2 text-9eafc0 text-14 items-center" itemScope itemType="https://schema.org/Person">
            {props.post.author.picture && (
              <Image
                src={props.post.author.picture}
                width={16}
                height={16}
                alt={props.post.author.name}
                itemProp="image"
                className="object-contain aspect-square rounded-full"
              />
            )}

            <span itemProp="name" className="leading-[100%]">
              {props.post.author.name}
            </span>
          </div>

          <div className="space-y-3">
            <h3 itemProp="name" className="text-32">
              {props.post.title}
            </h3>

            <div itemProp="description" className="text-596673">
              {props.post.description}
            </div>
          </div>
        </div>

        <div className="md:justify-self-end -order-1 md:order-1">
          {props.post.poster && (
            <Image
              src={props.post.poster}
              width={125}
              height={125}
              alt={props.post.title}
              className="w-full md:w-auto"
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-9eafc0 flex gap-2">
          <span itemProp="datePublished">{dayjs(props.post.date).format('MMMM DD, YYYY')}</span>
          &middot;
          <span>{props.post.readTime}m read</span>
        </div>

        <ArrowLink href={props.post.url} className="text-7068fa text-18 font-normal">
          Learn more
        </ArrowLink>
      </div>
    </article>
  )
})
