/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@uiw/react-codemirror"],
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};
module.exports = nextConfig;
