/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';
import _ from 'lodash';
import constants from './constants';

// initial state
const state = {
  theme: true,
  fullscreen: false,
  config: {}
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
  },
  getsettings({ commit }, callback) {
    const url = [constants.state.apiUrl(), '/settings'].join('');
    const ajaxCall = Vue.axios.get(url);

    ajaxCall.then((response) => {
      commit('setConfig', { response, callback });
    });

    return ajaxCall;
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
  setConfig(state, { response, callback }) {
    state.config.checkEachMinutes = response.data.checkEachMinutes;

    if (callback) {
      callback();
    }
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
