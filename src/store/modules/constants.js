/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';

// initial states
const state = {
  name: 'Crypto Cap Watcher',
  shortName: 'CCW',
  namespace: 'urn:x-cast:com.cryptocapwatcher.cryptocapwatcher-dashboard',
  chromecastApplicationId: 'C31048A8',
  description: 'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.',
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
    '5~CCCAGG~BTC~USD',
    '5~CCCAGG~ETH~USD'
  ],
  apiUrlCoinmarketcap: 'https://api.coinmarketcap.com/v1/ticker',
  wsLivetimePricesUrl: 'https://streamer.cryptocompare.com'
};

export default {
  state
};
