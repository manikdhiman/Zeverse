import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // TypeScript rules ko build phase par strict compile error dene se rokega
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint syntax validation checks ko deployment ke time bypass karega
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;