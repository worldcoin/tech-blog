import { ReactNode } from "react";
import { PageMeta } from "./page-meta";
import { TOC } from "./table-of-contents";

export type BlogPageProps = {
  meta: PageMeta;
  toc: TOC;
  children: ReactNode;
  relatedPosts: Array<PageMeta>;
};
