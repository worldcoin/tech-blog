import nextMDX from '@next/mdx'
import rehypeMathjax from 'rehype-mathjax'
import remarkMath from 'remark-math'

const withMDX = nextMDX({
  extension: /\.mdx?$/,

  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
export default withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
    ]
  },

  webpack: (config) => {
    config.resolve.fallback = {fs: false}
    return config
  },

  publicRuntimeConfig: {
    ...Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_PUBLIC_'))),
  },
})
