/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize for Fleek/IPFS deployment
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Better routing for static hosting
  trailingSlash: true,
  
  // Optimize output
  output: 'export', // Enable static export
  
  // Disable server-side features for static hosting
  swcMinify: true,
}

module.exports = nextConfig
