/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Ensures static HTML export
    images: {
      unoptimized: true, // Prevents image optimization issues on Cloudflare
    },
  };
  
  module.exports = nextConfig;
  