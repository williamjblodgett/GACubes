import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/GACubes",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
