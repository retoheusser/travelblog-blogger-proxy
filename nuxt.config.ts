// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module'],
  eslint: {
    config: {
      stylistic: true,
    },
    checker: true,
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  vuetify: {
    vuetifyOptions: './vuetify.config.ts',
  },
  routeRules: {
    // '/': { ssr: true, cache: { maxAge: 60, staleMaxAge: 3600, swr: true } },
  },
  runtimeConfig: {
    blogger: {
      apiKey: '',
      blogId: '',
    },
  },
})
