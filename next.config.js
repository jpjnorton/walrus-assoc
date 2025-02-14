/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // This replaces `next export`
    images: {
      unoptimized: true, // Ensures images work with static export
    },
    distDir: "docs", // Ensures Next.js outputs to the /docs folder
    basePath: "", // Avoids extra subdirectories in the URL
    trailingSlash: true, // Helps with Cloudflare Pages routing
  };
  
  module.exports = nextConfig;
  