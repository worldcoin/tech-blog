import {apiFetch} from 'common/helpers/fetch-api'
import {Home} from 'Home'
import {ApiGetBlogCategoriesResponse} from './api/get-blog-categories'
import {ApiGetBlogPostsResponse} from './api/get-blog-posts'
export default Home

export type HomePageProps = {
  categories: ApiGetBlogCategoriesResponse['categories']
  posts: ApiGetBlogPostsResponse['posts']
}

export async function getStaticProps() {
  return {
    props: {
      categories: (await apiFetch<ApiGetBlogCategoriesResponse>('/get-blog-categories')).categories,
      posts: (await apiFetch<ApiGetBlogPostsResponse>('/get-blog-posts')).posts,
    },
    revalidate: 5 * 60,
  }
}
