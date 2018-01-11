/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// initial state
const state = {
  theme: true,
  fullscreen: false
};

// getters
const getters = {
  theme: state => state.theme,
  fullscreen: state => state.fullscreen
};

// actions
const actions = {};

// mutations
const mutations = {
  switchTheme(state) {
    state.theme = !state.theme;
  },
  switchFullscreen(state) {
    state.fullscreen = !state.fullscreen;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
