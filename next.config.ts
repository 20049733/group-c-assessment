import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for optimised Docker standalone builds.
  // Produces a self-contained .next/standalone folder with a minimal server.js
  output: "standalone",
};

export default nextConfig;
