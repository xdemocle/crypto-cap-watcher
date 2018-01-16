import Vue from 'vue';

// initial state
const state = {
  name: 'Crypto Cap Watcher',
  secondsThrottling: 30,
  apiUrl() {
    let apiUrl = null;

    if (Vue.config.productionTip === 'development') {
      apiUrl = 'http://localhost:5000';
    } else {
      apiUrl = 'https://crypto-cap-watcher-api.herokuapp.com';
    }

    return apiUrl;
  },
  wsCccSubscriptions: [
    '5~CCCAGG~BTC~USD'
    // '5~CCCAGG~USDT~USD'
  ],
  apiUrlCoinmarketcap: 'https://api.coinmarketcap.com/v1/ticker'
};

export default {
  state
};
