import slugify from "@sindresorhus/slugify";
import { Article } from "Article";
import { CodeBlock } from "common/CodeBlock";
import { collectHeadings, getMetadata } from "common/helpers";
import { getMdxFiles } from "common/helpers/server";
import { getBlogPosts } from "common/helpers/server/get-blog-posts";
import { PageMeta, TOC } from "common/types";
import { readFile } from "fs/promises";
import { GetStaticPropsContext } from "next";
import {
  MDXRemote,
  MDXRemoteProps,
  MDXRemoteSerializeResult,
} from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { basename, extname, resolve } from "path";
import { ReactNode } from "react";
import rehypeKatex from "rehype-katex";
import rehypeDocument from "rehype-document";
import remarkMath from "remark-math";

const components: MDXRemoteProps["components"] = {
  Meta: () => null,

  h2: (props: { children?: ReactNode }) => (
    <h2 id={slugify(props.children as string)}>{props.children}</h2>
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3 id={slugify(props.children as string)}>{props.children}</h3>
  ),

  pre: (props) => (
    <pre {...props}>
      {/* @ts-ignore */}
      <CodeBlock {...props.children.props} />
    </pre>
  ),

  code: (props) => (
    <span className="[&_.token.plain]:text-010101 bg-dadada/50 px-1.5 py-0.5 rounded-md">
      <CodeBlock {...props} />
    </span>
  ),
};

export default function BlogPage(props: {
  source: MDXRemoteSerializeResult;
  meta: PageMeta;
  toc: TOC;
  relatedPosts: Array<PageMeta>;
}) {
  return (
    <Article
      meta={props.meta}
      toc={props.toc}
      relatedPosts={props.relatedPosts}
    >
      <MDXRemote {...props.source} components={components} />
    </Article>
  );
}

export async function getStaticPaths() {
  return {
    paths: await (
      await getMdxFiles("./src/pages/blog")
    ).map((path) => ({ params: { path: basename(path, extname(path)) } })),
    fallback: false,
  };
}

const getFileSource = async (path: string) => {
  const base = "./src/pages/blog";
  const result: {
    format?: "md" | "mdx";
    fileSource?: string;
  } = { format: undefined, fileSource: undefined };

  try {
    result.fileSource = await (
      await readFile(resolve(base, `${path}.md`))
    ).toString();
    result.format = "md";
  } catch (err) {}

  try {
    result.fileSource = await (
      await readFile(resolve(base, `${path}.mdx`))
    ).toString();
    result.format = "mdx";
  } catch (err) {}

  return result as Required<typeof result>;
};

export async function getStaticProps(
  ctx: GetStaticPropsContext<{ path: string }>
) {
  const path = ctx.params?.path as string;

  if (!path) {
    return {
      notFound: true,
    };
  }

  const { fileSource, format } = await getFileSource(path);

  if (!fileSource) {
    return {
      notFound: true,
    };
  }

  const source = await serialize(fileSource, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: "html" }, rehypeDocument]],
      format: format ?? "detect",
    },
  });

  const url = `/blog/${path}`;
  // @ts-ignore
  const pageElement = (
    <MDXRemote
      {...source}
      // @ts-expect-error
      components={{ Meta: (props) => <pagemeta {...props} /> }}
    />
  );
  const meta = getMetadata(fileSource, url);
  const relatedPosts = (await getBlogPosts({ limit: 5 })).posts.filter(
    (post) => post?.url !== url
  );
  const toc = collectHeadings(pageElement);

  return {
    props: {
      source,
      meta,
      relatedPosts,
      toc,
    },
  };
}
