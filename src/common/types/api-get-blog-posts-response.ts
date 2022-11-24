import {PageMeta} from './page-meta'

export type ApiGetBlogPostsResponse = {
  posts: Array<PageMeta>
  total: number
}
