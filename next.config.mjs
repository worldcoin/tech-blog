import mdx from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'md', 'mdx'],
}

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },
})

export default withMDX(nextConfig)
