// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueMoment from 'vue-moment';

// Helpers
import colors from 'vuetify/es5/util/colors';

import App from './App';
import router from './router';
import store from './store';

require('vuetify/dist/vuetify.min.css');

Vue.use(Vuex);
Vue.use(VueMoment);

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935,
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
