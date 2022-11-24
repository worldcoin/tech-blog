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
  publicRuntimeConfig: {
    ...Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_PUBLIC_'))),
  },
})
