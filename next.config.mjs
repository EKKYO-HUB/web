/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.note.com",
      },
      {
        protocol: "https",
        hostname: "assets.st-note.com",
      },
      {
        protocol: "https",
        hostname: "d2l930y2yx77uf.cloudfront.net",
      },
    ],
  },
  async redirects() {
    return [
      // 旧 ekkyo.jp のルートがあれば追加
      // { source: '/old-path', destination: '/new-path', permanent: true },
    ];
  },
};

export default nextConfig;
