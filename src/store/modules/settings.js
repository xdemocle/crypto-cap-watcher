/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import _ from 'lodash';

// initial state
const state = {
  theme: true,
  fullscreen: false,
  config: null
};

// getters
const getters = {
  theme: state => state.theme,
  fullscreen: state => state.fullscreen,
  config: state => state.config
};

// actions
const actions = {
  updateConfigTiming({ commit, state }, id) {
    const timing = _.clone(state.config.timing);
    const index = _.findIndex(timing, { id });

    const visible = !timing[index].visible;

    commit('setTimingWrapper', { index, visible });
  }
};

// mutations
const mutations = {
  switchTheme(state) {
    state.theme = !state.theme;
  },
  switchFullscreen(state) {
    state.fullscreen = !state.fullscreen;
  },
  setConfig(state, config) {
    state.config = _.merge(config, state.config);
  },
  setTimingWrapper(state, { index, visible }) {
    state.config.timing[index].visible = visible;
    state.config = state.config;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
