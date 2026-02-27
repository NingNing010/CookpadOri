/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    optimizePackageImports: ['swiper', 'iconsax-reactjs'],
  },
  turbopack: {}, 
  
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3001", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "8080", pathname: "/**" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;