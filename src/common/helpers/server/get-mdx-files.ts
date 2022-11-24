import {lstat, readdir} from 'fs/promises'
import path from 'path'

/**
 * Find all mdx files in directory
 */
export const getMdxFiles = async (dir: string): Promise<Array<string>> => {
  dir = path.resolve(dir)

  if (!(await lstat(dir)).isDirectory()) {
    return []
  }

  return await Promise.all(
    (await readdir(dir)).filter((file) => /mdx?$/.test(file)).map((file) => path.resolve(dir, file)),
  )
}
