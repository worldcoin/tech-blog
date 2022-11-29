import {getMetadata} from 'common/helpers'
import {filePathToUrl, getMdxFiles} from 'common/helpers/server'
import {PageMeta} from 'common/types'
import {readFile} from 'fs/promises'
import {NextApiRequest, NextApiResponse} from 'next'

const simpleOrderKeys = ['title', 'description', 'category'] as const
type simpleOrderKey = typeof simpleOrderKeys[number]

const isSimpleOrderField = (key: unknown): key is simpleOrderKey => {
  return simpleOrderKeys.includes(key as simpleOrderKey)
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
  const files = await getMdxFiles('./src/pages/blog')

  const allPostsMeta = (
    await Promise.all(
      files.slice(start, start + limit).map(async (file) => {
        const fileString = (await readFile(file)).toString()
        return getMetadata(fileString, filePathToUrl(file, {base: 'blog'}), 'meta')
      }),
    )
  ).filter((meta) => typeof meta.title === 'string')

  const filterPost = (post: PageMeta) => {
    // NOTE: filter by query
    if (query) {
      const _query = query.toLocaleLowerCase()
      const title = post.title?.toLocaleLowerCase()
      const description = post.title?.toLocaleLowerCase()

      return title?.includes(_query) || description?.includes(_query)
    }

    // NOTE: filter by category
    if (category) {
      return post.category === category
    }

    return true
  }

  const sortPost = (first: PageMeta, second: PageMeta) => {
    const a = orderDir === 'ASC' ? first : second
    const b = orderDir === 'ASC' ? second : first

    if (isSimpleOrderField(orderBy)) {
      return a[orderBy]?.localeCompare(b[orderBy] || 'ZZZ') || 0
    }

    if ('author' === orderBy) {
      return a.author?.name.localeCompare(b.author?.name || 'ZZZ') || 0
    }

    if (orderBy === 'date') {
      return Number(a[orderBy]) - Number(b[orderBy])
    }

    return 0
  }

  const posts = allPostsMeta.filter(filterPost).sort(sortPost)

  return res.status(200).json({posts, total: allPostsMeta.length})
}
