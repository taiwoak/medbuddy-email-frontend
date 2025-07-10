import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;