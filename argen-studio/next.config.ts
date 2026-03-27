import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'argenstudio.com' }],
        destination: 'https://argen.co.kr/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.argenstudio.com' }],
        destination: 'https://argen.co.kr/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.argen.co.kr' }],
        destination: 'https://argen.co.kr/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
