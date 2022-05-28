const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'newsroom.pinterest.com'],
  },
});
