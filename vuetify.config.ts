import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import { md3 } from 'vuetify/blueprints'

export default defineVuetifyConfiguration({
  blueprint: md3,
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
