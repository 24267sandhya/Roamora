import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the multi-stage Docker build to produce a minimal server bundle
  output: "standalone",
};

export default nextConfig;
