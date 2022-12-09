import { promises as fs } from "fs";
import path from "path";

/**
 * Find all mdx files in directory
 */
export const getMdxFiles = async (dir: string): Promise<Array<string>> => {
  dir = path.resolve(dir);

  if (!(await fs.lstat(dir)).isDirectory()) {
    return [];
  }

  return await Promise.all(
    (await fs.readdir(dir))
      .filter((file) => /mdx?$/.test(file))
      .map((file) => path.resolve(dir, file))
  );
};
