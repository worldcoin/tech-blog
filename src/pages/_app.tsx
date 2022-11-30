import {Components as MDXComponents} from '@mdx-js/react/lib'
import slugify from '@sindresorhus/slugify'
import {Article} from 'Article'
import 'assets/globals.css'
import {CodeBlock} from 'common/CodeBlock'
import {collectHeadings, fetchApi, getMetadata} from 'common/helpers'
import {Layout} from 'common/Layout'
import {Meta} from 'common/Meta'
import {ApiGetBlogPostsResponse, PageMeta, TOC} from 'common/types'
import NextApp, {AppContext, AppInitialProps, AppProps as NextAppProps} from 'next/app'
import path from 'path'
import {Fragment, ReactNode, useEffect, useState} from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type AppProps =
  | {
      isBlog: false
      meta: never
      toc: never
      relatedPosts: never
    }
  | {
      isBlog: true
      meta: PageMeta
      toc: TOC
      relatedPosts: Array<PageMeta>
    }

const components: MDXComponents = {
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

const menuItems = [
  {title: 'About', url: '/about'},
  {title: 'Blog', url: '/blog'},
  {title: 'Privacy', url: '/privacy'},
  {title: 'Signup', url: '/sign-up'},
]

export function App(props: NextAppProps<AppProps>) {
  const {isBlog, meta, toc, relatedPosts} = props.pageProps

  return (
    <Fragment>
      <Meta title={meta?.title ? `${meta?.title} | Worldcoin tech blog` : 'Worldcoin tech blog'} description={''}>
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content="Worldcoin" />
        <meta key="og:url" property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        {/* FIXME: add image */}
        {/* <meta key="og:image" property="og:image" content={metaImageUrl} /> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="Worldcoin" />
        <meta key="twitter:url" property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
        {/* FIXME: add image */}
        {/* <meta name="twitter:image" property="twitter:image" content={metaImageUrl} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#191919" />
        <link key="canonical" rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}${props.router.asPath}`} />
      </Meta>

      <Layout menuItems={menuItems}>
        {isBlog && (
          <Article meta={meta} toc={toc} relatedPosts={relatedPosts}>
            <props.Component {...props.pageProps} components={components} />
          </Article>
        )}

        {!isBlog && <props.Component {...props.pageProps} />}
      </Layout>

      <ToastContainer />
    </Fragment>
  )
}

App.getInitialProps = async (ctx: AppContext) => {
  const appProps = (await NextApp.getInitialProps(ctx)) as AppInitialProps<AppProps>
  appProps.pageProps.isBlog = /^\/blog/.test(ctx.router.asPath)

  if (!appProps.pageProps.isBlog) {
    return {...appProps}
  }

  // @ts-ignore
  const pageElement = <ctx.Component components={{Meta: (props) => <pagemeta {...props} />}} />
  const allPosts = await fetchApi<ApiGetBlogPostsResponse>('/get-blog-posts', {params: {limit: 5}})
  const relatedPosts = allPosts.posts.filter((post) => path.basename(post.url) !== path.basename(ctx.router.asPath))
  const meta = await getMetadata(pageElement, ctx.router.asPath)
  const toc = collectHeadings(pageElement)

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      meta,
      toc,
      relatedPosts,
    },
  }
}

export default App
