import slugify from '@sindresorhus/slugify'
import {Article} from 'Article'
import {CodeBlock} from 'common/CodeBlock'
import {collectHeadings, getMetadata} from 'common/helpers'
import {getMdxFiles} from 'common/helpers/server'
import {getBlogPosts} from 'common/helpers/server/get-blog-posts'
import {PageMeta, TOC} from 'common/types'
import {readFile} from 'fs/promises'
import {GetStaticPropsContext} from 'next'
import {MDXRemote, MDXRemoteProps, MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from 'next-mdx-remote/serialize'
import {basename, extname, resolve} from 'path'
import {ReactNode, useEffect, useState} from 'react'
import rehypeMathJaxSvg from 'rehype-mathjax'
import remarkMath from 'remark-math'

const components: MDXRemoteProps['components'] = {
  Meta: () => null,

  // NOTE: fix hydration error for mathjax
  // @ts-ignore -- need for workaround style tag
  style: (args: [string]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- necessary rule for object key
    const [style, setStyle] = useState<string>('')
    // eslint-disable-next-line react-hooks/rules-of-hooks -- necessary rule for object key
    useEffect(() => setStyle(args[0]), [args])
    return <style>{style}</style>
  },

  h2: (props: {children?: ReactNode}) => <h2 id={slugify(props.children as string)}>{props.children}</h2>,
  h3: (props: {children?: ReactNode}) => <h3 id={slugify(props.children as string)}>{props.children}</h3>,

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
}

export default function BlogPage(props: {
  source: MDXRemoteSerializeResult
  meta: PageMeta
  toc: TOC
  relatedPosts: Array<PageMeta>
}) {
  return (
    <Article meta={props.meta} toc={props.toc} relatedPosts={props.relatedPosts}>
      <MDXRemote {...props.source} components={components} />
    </Article>
  )
}

export async function getStaticPaths() {
  return {
    paths: await (
      await getMdxFiles('./src/pages/blog')
    ).map((path) => ({params: {path: basename(path, extname(path))}})),
    fallback: false,
  }
}

const getFileSource = async (path: string) => {
  const base = './src/pages/blog'
  const mdFile = resolve(base, `${path}.md`)
  const mdxFile = resolve(base, `${path}.mdx`)

  try {
    return await (await readFile(mdFile)).toString()
  } catch (err) {}

  try {
    return await (await readFile(mdxFile)).toString()
  } catch (err) {}

  return null
}

export async function getStaticProps(ctx: GetStaticPropsContext<{path: string}>) {
  const path = ctx.params?.path as string

  if (!path) {
    return {
      notFound: true,
    }
  }

  const fileSource = await getFileSource(path)

  if (!fileSource) {
    return {
      notFound: true,
    }
  }

  const source = await serialize(fileSource, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathJaxSvg],
      format: 'mdx',
    },
  })

  const url = `/blog/${path}`
  // @ts-ignore
  const pageElement = <MDXRemote {...source} components={{Meta: (props) => <pagemeta {...props} />}} />
  const meta = getMetadata(pageElement, url)
  const relatedPosts = (await getBlogPosts({limit: 5})).posts.filter((post) => post.url !== url)
  const toc = collectHeadings(pageElement)

  return {
    props: {
      source,
      meta,
      relatedPosts,
      toc,
    },
  }
}
