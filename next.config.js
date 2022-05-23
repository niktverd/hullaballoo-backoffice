const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'newsroom.pinterest.com'],
  },
  pwa: {
    dest: 'public',
    // register: true,
    // skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development',
  }
});
