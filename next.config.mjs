/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx"],

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },

  publicRuntimeConfig: {
    ...Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.startsWith("NEXT_PUBLIC_")
      )
    ),
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "https://worldcoin.org/blog/developers",
        permanent: true,
      },
      {
        source: "/blog/4844-testimonial",
        destination: "/blog/eip-4844",
        permanent: true,
      },

      // REVIEW: Should we have this one?
      {
        source: "/blog/eip-4844",
        destination: "https://worldcoin.org/blog/developers/blog/eip-4844",
        permanent: true,
      },
    ];
  },
};

export default config;
