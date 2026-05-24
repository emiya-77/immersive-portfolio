import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['unskilled-ritzy-unworldly.ngrok-free.dev'],
    },
  },
};

export default nextConfig;
