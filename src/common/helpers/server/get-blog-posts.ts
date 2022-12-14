import { getMetadata } from "common/helpers";
import { PageMeta } from "common/types";
import dayjs from "dayjs";
import { readFile } from "fs/promises";
import { filePathToUrl } from "./file-path-to-url";
import { getMdxFiles } from "./get-mdx-files";

export type getBlogPostsOptions = {
  category?: string;
  query?: string;
  orderBy?: string;
  orderDir?: string;
  start?: number | string;
  limit?: number | string;
};

const simpleOrderKeys = ["title", "description", "category"] as const;
type simpleOrderKey = typeof simpleOrderKeys[number];

const isSimpleOrderField = (key: unknown): key is simpleOrderKey => {
  return simpleOrderKeys.includes(key as simpleOrderKey);
};

export const getBlogPosts = async (options?: getBlogPostsOptions) => {
  const category = options?.category;
  const query = options?.query;
  const orderBy = options?.orderBy ?? "date";
  const orderDir = (options?.orderDir ?? "DESC").toUpperCase();
  const start = Number(options?.start ?? 0);
  const limit = Number(options?.limit ?? 3);

  if (
    !["title", "description", "category", "date", "author"].includes(orderBy)
  ) {
    throw new Error(`orderBy field ${orderBy} not support`);
  }

  if (!["ASC", "DESC"].includes(orderDir)) {
    throw new Error(`orderDir ${orderDir} not support, use ASC/DESC`);
  }

  const files = await getMdxFiles("./src/pages/blog");

  const allPostsMeta = (
    await Promise.all(
      files.slice(start, start + limit).map(async (file) => {
        const fileString = (await readFile(file)).toString();
        return getMetadata(fileString, filePathToUrl(file, { base: "blog" }));
      })
    )
  ).filter((meta) => typeof meta?.title === "string");

  const filterPost = (post?: Partial<PageMeta>) => {
    // NOTE: filter if error in meta
    if (!post) {
      return false;
    }

    // NOTE: filter by query
    if (query) {
      const _query = query.toLocaleLowerCase();
      const title = post.title?.toLocaleLowerCase();
      const description = post.title?.toLocaleLowerCase();

      return title?.includes(_query) || description?.includes(_query);
    }

    // NOTE: filter by category
    if (category) {
      return post.category === category;
    }

    return true;
  };

  const sortPost = (first?: Partial<PageMeta>, second?: Partial<PageMeta>) => {
    const a = orderDir === "ASC" ? first : second;
    const b = orderDir === "ASC" ? second : first;

    if (!a || !b) {
      return 0;
    }

    if (isSimpleOrderField(orderBy)) {
      return a[orderBy]?.localeCompare(b[orderBy] || "ZZZ") || 0;
    }

    if ("author" === orderBy) {
      return a.author?.name.localeCompare(b.author?.name || "ZZZ") || 0;
    }

    if (orderBy === "date") {
      return Number(dayjs(a[orderBy])) - Number(dayjs(b[orderBy]));
    }

    return 0;
  };
  return {
    posts: allPostsMeta.filter(filterPost).sort(sortPost),
    total: allPostsMeta.length,
  };
};
