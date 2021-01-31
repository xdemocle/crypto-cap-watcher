import Vue from 'vue'
import { version } from '../package.json'

Vue.config.productionTip = process.env.NODE_ENV
Vue.appVersion = version
