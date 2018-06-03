import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueMoment from 'vue-moment';
import VueCurrencyFilter from 'vue-currency-filter';
import moment from 'moment-timezone';
import fullscreen from 'vue-fullscreen';
import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import VueChromecastPlugin from 'vue-chromecast-plugin';

// Helpers
import colors from 'vuetify/es5/util/colors';

import App from './App';
import store from './store';

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

Vue.use(VueChromecastPlugin, {
  applicationId: store.state.constants.chromecastApplicationId,
  applicationName: store.state.constants.name,
  applicationNamespace: store.state.constants.namespace
});

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935,
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
});

// Vue.config.productionTip = process.env.NODE_ENV;
Vue.config.productionTip = 'production';

window.Vue = Vue;

Vue.use(VueSocketio, socketio(store.state.constants.wsLivetimePricesUrl), store);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
});
