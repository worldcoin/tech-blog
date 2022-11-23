import {getMdxFiles} from 'common/helpers/get-mdx-files'
import {readFile} from 'fs/promises'
import {NextApiRequest, NextApiResponse} from 'next'
import parse from 'node-html-parser'

export type ApiGetBlogCategoriesResponse = {
  categories: Array<string>
}

/**
 * Parse and return all blog posts categories
 */
export default async function getBlogCategories(req: NextApiRequest, res: NextApiResponse) {
  let categories: Array<string> = []

  const blogFiles = await getMdxFiles('./src/pages/blog')

  await Promise.all(
    blogFiles.map(async (file) => {
      const html = parse((await readFile(file)).toString())
      const categoryElement = html.querySelector('meta > category')

      if (categoryElement) {
        const categoryName = categoryElement.textContent.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ')
        console.log('found', categoryName)

        if (!categories.includes(categoryName)) {
          categories.push(categoryName)
        }
      }
    }),
  )

  // NOTE: order asc
  categories = categories.sort((a, b) => a.localeCompare(b))

  // NOTE: remove empty
  categories = categories.filter((category) => category.length > 0)

  res.status(200).json({categories})
}
