/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// initial state
const state = {
  lastUpdate: new Date(),
  secondsLeft: 0,
  total_market_cap_usd: 0,
  bitcoin_percentage_of_market_cap: 0,
  total_24h_volume_usd: 0
};

// getters
const getters = {
  lastUpdate: state => state.lastUpdate,
  secondsLeft: state => state.secondsLeft,
  total_market_cap: state => state.total_market_cap_usd,
  bitcoin_percentage_of_market_cap(state) {
    return [state.bitcoin_percentage_of_market_cap, '%'].join('');
  },
  total_24h_volume: state => state.total_24h_volume_usd
};

// actions
const actions = {
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit(types.RECEIVE_PRODUCTS, { products })
  //   })
  // }
};

// mutations
const mutations = {
  // switchTheme(state) {
  //   state.theme = !state.theme;
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
