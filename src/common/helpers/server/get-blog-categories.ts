import { readFile } from "fs/promises";
import parse from "node-html-parser";
import { getMdxFiles } from "./get-mdx-files";

export const getBlogCategories = async () => {
  let categories: Array<string> = [];
  const blogFiles = await getMdxFiles("./src/pages/blog");

  await Promise.all(
    blogFiles.map(async (file) => {
      const html = parse((await readFile(file)).toString());
      const categoryElement = html.querySelector("meta > category");

      if (categoryElement) {
        const categoryName = categoryElement.textContent
          .replace(/^\s+|\s+$/g, "")
          .replace(/\s+/g, " ");

        if (!categories.includes(categoryName)) {
          categories.push(categoryName);
        }
      }
    })
  );

  // NOTE: order asc
  categories = categories.sort((a, b) => a.localeCompare(b));

  // NOTE: remove empty
  categories = categories.filter((category) => category.length > 0);

  return categories;
};
