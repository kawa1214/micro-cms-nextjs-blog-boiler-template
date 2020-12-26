module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/generateSiteMap')
    }
    return config
  },
  images: {
    domains: ['images.microcms-assets.io'],
  },
}