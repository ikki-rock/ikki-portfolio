import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // 이미지 업로드를위해 추가(미지정시 1mb)
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coljjjyyfldnwqwsetzs.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
