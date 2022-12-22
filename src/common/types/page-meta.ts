import { BlogCategory } from "../../../types";

export type PageMeta = {
  author?: { name: string; picture?: string };
  category?: BlogCategory;
  date?: string;
  description?: string;
  poster?: string;
  socialImage?: string;
  title: string;
  readTime: number;
  url: string;
};
