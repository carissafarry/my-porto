import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
// import NextPWA from 'next-pwa'
//
//
// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable:
//     process.env.NODE_ENV === "development" ||
//     process.env.NODE_ENV === "preview" ||
//     process.env.NODE_ENV === "production",
//   // delete two lines above to enable PWA in production deployment
//   // add your own icons to public/manifest.json
//   // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
// });
//
// /** @type {import('next').NextConfig} */
// module.exports = withPWA({
//   swcMinify: true,
//   reactStrictMode: true,
//   eslint: {
//     dirs: ["src"],
//   },
// });

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

export default withMDX(nextConfig)