import 'custom-event-polyfill'
import Vue from 'vue'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import router from './router'
import App from './components/app.vue'
import store from './store'
import './plugins/vue-app-version'
import './plugins/vue-currency-filter'
import './plugins/vue-fullscreen'
import './plugins/vue-moment'
import './plugins/vue-i18n'
import './plugins/vue-socketio'
import './register-service-worker'
import './styles/index.scss'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

// Global app container accessible from console
window.app = process.env.VUE_APP_BUILD

axios.defaults.withCredentials = true

// if (Vue.config.productionTip && window.app.git.branch === 'master') {
// }

// eslint-disable-next-line
;(async () => {
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})()
