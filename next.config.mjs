/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],

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
}
