import {fetchApi} from 'common/helpers'
import {ApiGetBlogCategoriesResponse, ApiGetBlogPostsResponse} from 'common/types'
import {Home} from 'Home'
export default Home

export async function getStaticProps() {
  return {
    props: {
      categories: (await fetchApi<ApiGetBlogCategoriesResponse>('/get-blog-categories')).categories,
      posts: (await fetchApi<ApiGetBlogPostsResponse>('/get-blog-posts')).posts,
    },

    revalidate: 5 * 60,
  }
}
