import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [{ loader: "graphql-tag/loader" }],
    });

    return config;
  },
};

export default nextConfig;
