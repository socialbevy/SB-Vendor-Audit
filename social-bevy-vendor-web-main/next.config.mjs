/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'xwpg-kuah-brlj.n7d.xano.io',
        pathname: '**'
      }
    ]
  },
};

export default nextConfig;
