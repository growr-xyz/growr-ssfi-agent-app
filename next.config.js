module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  },
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  }
}
