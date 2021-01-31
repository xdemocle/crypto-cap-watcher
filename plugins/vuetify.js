import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935,
    accent: colors.indigo.base, // #3F51B5
    secondary: colors.red.lighten4 // #FFCDD2
  }
})
