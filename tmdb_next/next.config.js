/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost:3000", "gw.alipayobjects.com"],
  },
};

module.exports = nextConfig;
