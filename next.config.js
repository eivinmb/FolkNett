/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  // Static HTML export (out/), served directly by nginx on the VPS.
  output: "export",
  trailingSlash: true,
};

module.exports = nextConfig;
