import {getBlogCategories} from 'common/helpers/server/get-blog-categories'
import {getBlogPosts} from 'common/helpers/server/get-blog-posts'
import {Home} from 'Home'
export default Home

export async function getStaticProps() {
  return {
    props: {
      categories: await getBlogCategories(),
      posts: await (await getBlogPosts()).posts,
    },
  }
}
