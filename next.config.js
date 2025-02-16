/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true, // Prevents image optimization issues on Cloudflare
    },
  };
  
  module.exports = nextConfig;
  