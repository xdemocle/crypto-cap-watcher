/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';
import _ from 'lodash';
import constants from './constants';

// initial state
const state = {
  theme: true,
  fullscreen: false,
  tether: false,
  showMillions: true,
  config: {}
};

// getters
const getters = {
  theme: state => state.theme,
  fullscreen: state => state.fullscreen,
  tether: state => state.tether,
  showMillions: state => state.showMillions,
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
  switchTether(state) {
    state.tether = !state.tether;
  },
  switchShowMillions(state) {
    state.showMillions = !state.showMillions;
  },
  resetFullscreen(state) {
    state.fullscreen = false;
  },
  setConfig(state, { response, callback }) {
    const checkEachMinutes = response.data.checkEachMinutes;

    // Don't look at the two iterators below, your eyes could bleeds :D
    if (state.config.timing) {
      _.each(state.config.timing, (timing, index) => {
        if (timing) {
          const item = _.find(response.data.timing, { id: timing.id });

          if (!item) {
            Vue.delete(state.config.timing, index);
          }
        }
      });

      _.each(response.data.timing, (timing) => {
        const item = _.find(state.config.timing, { id: timing.id });

        if (!item) {
          state.config.timing.push(timing);
        }
      });
    } else {
      state.config = response.data;
    }

    state.config.checkEachMinutes = checkEachMinutes;

    if (callback) {
      callback();
    }
  },
  setTimingWrapper(state, { index, visible }) {
    state.config.timing[index].visible = visible;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
