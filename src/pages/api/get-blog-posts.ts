import { getBlogPosts as _getBlogPosts } from "common/helpers/server/get-blog-posts";
import { NextApiRequest, NextApiResponse } from "next";

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
export default async function getBlogPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { posts, total } = await _getBlogPosts({
      category: [req.query.category].flat()[0],
      query: [req.query.query].flat()[0],
      orderBy: [req.query.order].flat()[0],
      orderDir: [req.query.dir].flat()[0],
      start: [req.query.start].flat()[0],
      limit: [req.query.limit].flat()[0],
    });

    return res.status(200).json({ posts, total });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
}
