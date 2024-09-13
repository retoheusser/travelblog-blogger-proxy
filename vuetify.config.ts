import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'blog',
    themes: {
      blog: {
        colors: {
          primary: '#00796B',
        },
      },
    },
  },
})
