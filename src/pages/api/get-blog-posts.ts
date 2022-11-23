import {filePathToUrl} from 'common/helpers/file-path-to-url'
import {getMdxFiles} from 'common/helpers/get-mdx-files'
import {getMetadata} from 'common/helpers/get-metadata'
import {PageMeta} from 'common/types/page-meta'
import {readFile} from 'fs/promises'
import {NextApiRequest, NextApiResponse} from 'next'

export type ApiGetBlogPostsResponse = {
  posts: Array<PageMeta>
  total: number
}

const isOrderByString = (key: string): key is 'title' | 'description' | 'category' => {
  return ['title', 'description', 'category'].includes(key)
}

/**
 * Return metadata from blog posts
 *
 * ### Request properties:
 *
 *      category {string} Filter by category
 *      query    {string} Filter by title or description
 *      order    {'title' | 'description' | 'category' | 'date' | 'author'} Order field
 *      dir      {'ASC' | 'DESC'} Order direction
 *      start    {number} Offset of posts query
 *      limit    {number} Limit of posts query
 */
export default async function getBlogPosts(req: NextApiRequest, res: NextApiResponse) {
  const category = [req.query.category].flat()[0]
  const query = [req.query.query].flat()[0]
  const orderBy = ([req.query.order].flat()[0] ?? 'date') as keyof PageMeta
  const orderDir = [req.query.dir].flat()[0] ?? 'DESC'
  const start = Number([req.query.start].flat()[0] ?? 0)
  const limit = Number([req.query.limit].flat()[0] ?? 3)

  const postsFiles = await getMdxFiles('./src/pages/blog')

  const allPostsMeta = (
    await Promise.all(
      postsFiles.slice(start, start + limit).map(async (file) => {
        const fileString = (await readFile(file)).toString()
        return getMetadata(fileString, {tag: 'meta', url: filePathToUrl(file, {base: 'blog'})})
      }),
    )
  ).filter((meta) => typeof meta.title === 'string')

  const posts = (() => {
    let result = allPostsMeta

    // NOTE: filter by query
    if (query) {
      result = result.filter((meta) => {
        const _query = query.toLocaleLowerCase()
        const title = meta.title?.toLocaleLowerCase()
        const description = meta.title?.toLocaleLowerCase()

        return title?.includes(_query) || description?.includes(_query)
      }, [])
    }

    // NOTE: filter by category
    if (category) {
      result = result.filter((meta) => meta.category === category)
    }

    result = result.sort((first, second) => {
      const a = orderDir === 'ASC' ? first : second
      const b = orderDir === 'ASC' ? second : first

      if (isOrderByString(orderBy)) {
        return a[orderBy]?.localeCompare(b[orderBy] || 'ZZZ') || 0
      }

      if ('author' === orderBy) {
        return a.author?.name.localeCompare(b.author?.name || 'ZZZ') || 0
      }

      if (orderBy === 'date') {
        return Number(a[orderBy]) - Number(b[orderBy])
      }

      return 0
    })

    return result
  })()

  return res.status(200).json({posts, total: allPostsMeta.length})
}