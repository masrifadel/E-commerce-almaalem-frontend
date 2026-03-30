/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration for Next.js 16
  turbopack: {},

  // Remove console.log in production
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.keys(config.entry).forEach((key) => {
        config.entry[key].unshift("webpack-hot-middleware/client?reload=true");
      });
    }
    return config;
  },

  // Image optimization
  images: {
    domains: ["your-api-domain.com"],
    formats: ["image/webp", "image/avif"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
