/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL
  }
};

export default nextConfig;
