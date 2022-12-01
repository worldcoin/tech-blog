import {renderReadTime} from 'common/helpers'
import {BlogPageProps} from 'common/types'
import dayjs from 'dayjs'
import Link from 'next/link'
import {Fragment, memo} from 'react'

export const Popular = memo(function Popular(props: {posts: BlogPageProps['relatedPosts']}) {
  return (
    <div className="grid gap-6">
      <span className="font-bold text-20">/ Popular</span>

      {props.posts.map((post, index) => (
        <Link href={post.url} key={index} className="border-b border-70868f/10 pb-6">
          {(post.date || post.readTime) && (
            <div className="flex gap-2 text-626467 opacity-50">
              {post.date && (
                <Fragment>
                  <span>{dayjs(post.date).format('MMMM DD, YYYY')}</span>
                  <span>&middot;</span>
                </Fragment>
              )}

              {post.readTime && <span>{renderReadTime(post.readTime)}</span>}
            </div>
          )}

          <span className="font-bold">{post.title}</span>
        </Link>
      ))}
    </div>
  )
})
