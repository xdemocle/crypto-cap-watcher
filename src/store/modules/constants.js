/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';

// initial state
const state = {
  name: 'Crypto Cap Watcher',
  checkEachMinutes: 5,
  secondsThrottling: 30,
  apiUrl() {
    let apiUrl = null;

    if (Vue.config.productionTip === 'development') {
      apiUrl = 'http://localhost:5000';
    } else {
      apiUrl = 'https://crypto-cap-watcher-api.herokuapp.com';
    }

    return apiUrl;
  }
};

export default {
  state
};
