// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import Vuetify from 'vuetify';
import VueMoment from 'vue-moment';
import VueCurrencyFilter from 'vue-currency-filter';
import moment from 'moment-timezone';
import fullscreen from 'vue-fullscreen';

// Helpers
import colors from 'vuetify/es5/util/colors';

import App from './App';
import store from './store';

Vue.use(VueSocketio, socketio('https://streamer.cryptocompare.com'), store);

Vue.use(VueAxios, axios);

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false
});

Vue.use(VueMoment, {
  moment
});

Vue.use(fullscreen);

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935,
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
});

Vue.config.productionTip = process.env.NODE_ENV;

window.Vue = Vue;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
});
