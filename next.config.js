/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/@:user",
  //       destination: "/user/:user",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
