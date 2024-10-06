// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module', '@vueuse/nuxt', '@pinia/nuxt'],
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
    public: {
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',
        vapidKey: '',
      },
    },
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: undefined },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap', crossorigin: undefined },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#37503D' },
      ],
    },
  },
  css: ['./font.css', './lib/departure-board/departure-board.css'],
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
