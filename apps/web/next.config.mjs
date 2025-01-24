/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@wallet/constants"],
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
