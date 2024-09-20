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
  ssr: false,
  runtimeConfig: {
    blogger: {
      apiKey: '',
      blogId: '',
    },
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: undefined },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap', crossorigin: undefined },
      ],
    },
  },
  css: ['./font.css'],
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        region: 'europe-west1',
      },
      nodeVersion: '20',
    },
  },
})
