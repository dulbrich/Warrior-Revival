/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xuxvxxlcmwhmcxatpcri.supabase.co",
        pathname: "/storage/v1/object/public/**"
      },
      {
        protocol: "https",
        hostname: "dih4lvql8rjzt.cloudfront.net",
        pathname: "/cms/**"
      },
      {
        protocol: "https",
        hostname: "keyviamortgage.com",
        pathname: "/wp-content/uploads/**"
      }
    ]
  }
};

export default nextConfig;
