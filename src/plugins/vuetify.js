import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import '@mdi/font/css/materialdesignicons.css'

const opts = {
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.red.darken1, // #E53935,
        accent: colors.indigo.base, // #3F51B5
        secondary: colors.red.lighten4 // #FFCDD2
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
}

Vue.use(Vuetify)

export default new Vuetify(opts)
