// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#B71C1C',
          secondary: '#E57373',
          info: '#90A4AE',
          success: '#4CAF50',
          warning: '#FF6D00',
          error: '#DD2C00'
        }
      },
    },
  },

})
