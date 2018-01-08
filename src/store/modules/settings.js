/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// initial state
const state = {
  theme: true
};

// getters
const getters = {
  theme: state => state.theme
};

// actions
const actions = {};

// mutations
const mutations = {
  switchTheme(state) {
    state.theme = !state.theme;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
