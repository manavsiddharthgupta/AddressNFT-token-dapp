/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_GOOGLE_API_KEY: process.env.NEXT_APP_GOOGLE_API_KEY,
    NEXT_APP_PRIVATE_KEY: process.env.NEXT_APP_PRIVATE_KEY,
    NEXT_APP_SEPOLIA_URL: process.env.NEXT_APP_SEPOLIA_URL
  }
}

export default nextConfig
