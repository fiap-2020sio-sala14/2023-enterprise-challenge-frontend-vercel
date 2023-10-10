/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  webpack: (config) => {
    // Enable topLevelAwait
    config.experiments.topLevelAwait = true;
    return config;
  },
};
