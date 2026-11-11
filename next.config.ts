import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Case studies moved from /projects to /work; keep every old link alive.
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
