import {Components as MDXComponents} from '@mdx-js/react/lib'
import 'assets/globals.css'
import {getMetadata} from 'common/helpers/get-metadata'
import {Layout} from 'common/Layout'
import {Meta} from 'common/Meta'
import {ThemeProvider} from 'contexts/ThemeContext'
import type {AppProps} from 'next/app'
import {Fragment, useEffect, useMemo, useState} from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const getComponents = (render: boolean = true): MDXComponents => ({
  // @ts-ignore -- custom element, only for parse meta
  Meta: (props) => (render ? null : <pagemeta>{props.children}</pagemeta>),
  // NOTE: fix hydration error for mathjax
  // @ts-ignore
  style: (args: [string]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- necessary rule for object key
    const [style, setStyle] = useState<string>('')
    // eslint-disable-next-line react-hooks/rules-of-hooks -- necessary rule for object key
    useEffect(() => setStyle(args[0]), [args])
    return <style>{style}</style>
  },
})

export default function App(props: AppProps) {
  const pathname = useMemo(() => props.router.asPath.replace(/\/$/, ''), [props.router.asPath])
  const meta = useMemo(
    () => getMetadata(<props.Component {...props.pageProps} components={getComponents(false)} />),
    [props],
  )

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
        <link key="canonical" rel="canonical" href={`${process.env.NEXT_PUBLIC_APP_URL}${pathname}`} />
      </Meta>

      <ThemeProvider>
        <Layout
          menuItems={[
            {
              title: 'About',
              url: '/about',
            },
            {
              title: 'Blog',
              url: '/blog',
            },
            {
              title: 'Privacy',
              url: '/privacy',
            },
            {
              title: 'Signup',
              url: '/sign-up',
            },
          ]}
        >
          <props.Component {...props.pageProps} components={getComponents()} />
        </Layout>
      </ThemeProvider>
      <ToastContainer />
    </Fragment>
  )
}
