/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	transpilePackages: ["@uiw/react-codemirror"],
	images: {
		formats: ["image/webp", "image/avif"],
		domains: ["127.0.0.1"],
	},
	webpack(config, { isServer }) {
		if (!isServer) {
			config.resolve.fallback.fs = false;
		}
		config.experiments = { ...config.experiments, topLevelAwait: true };
		return config;
	},
};
module.exports = nextConfig;
