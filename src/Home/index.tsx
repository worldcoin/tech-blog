import {ApiGetBlogCategoriesResponse, ApiGetBlogPostsResponse} from 'common/types'
import {Fragment, memo} from 'react'
import {BlogList} from './BlogList'
import {Hero} from './Hero'

export type HomePageProps = {
  categories: ApiGetBlogCategoriesResponse['categories']
  posts: ApiGetBlogPostsResponse['posts']
}

export const Home = memo(function Home(props: HomePageProps) {
  return (
    <Fragment>
      <Hero />
      <BlogList categories={props.categories} posts={props.posts} />
    </Fragment>
  )
})
