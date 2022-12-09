import { Category } from "../../../types";

export type PageMeta = {
  author?: { name: string; picture?: string };
  category?: Category;
  date?: string;
  description?: string;
  poster?: string;
  title: string;
  readTime: number;
  url: string;
};
