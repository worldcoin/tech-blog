import rehypeMathjax from 'rehype-mathjax'
import remarkMath from 'remark-math'

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  publicRuntimeConfig: {
    ...Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_PUBLIC_'))),
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeMathjax],
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    })

    return config
  },
}
