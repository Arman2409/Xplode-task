/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FETCH_URL: process.env.FETCH_URL
  }
}

module.exports = nextConfig
