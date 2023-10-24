const { withContentlayer, } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const config = {
  swcMinify: false,
  // 정적 페이지의 결과물이 이 폴더에 생긴다.
  // basePath: '',
  // 결과물의 기본 경로를 설정한다.
  eslint: {
    dirs: [],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  images: {
    domains: [ 'https://nihilncunia.dev', ],
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  webpack(config, { webpack, }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [ '@svgr/webpack', ],
    });

    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
};

module.exports = config;
// module.exports = withContentlayer(config);
