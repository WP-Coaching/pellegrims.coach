import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "http",
    hostname: "**",
    pathname: "/api/media/**",
  },
  {
    protocol: "https",
    hostname: "**",
    pathname: "/api/media/**",
  },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
};

export default withPayload(
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig,
  { devBundleServerPackages: false }
);
