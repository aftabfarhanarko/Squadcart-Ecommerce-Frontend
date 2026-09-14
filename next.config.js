const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/themes",
  trailingSlash: true,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/themes/",
        permanent: false,
        basePath: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "squadlog-cdn.up.railway.app", pathname: "/uploads/**" },
      { protocol: "https", hostname: "squadlog-cdn.up.railway.app", pathname: "/uploads/**" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

module.exports = nextConfig;
