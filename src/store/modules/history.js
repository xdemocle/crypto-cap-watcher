/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';
import constants from './constants';

// initial state
const state = {
  requestBusy: false,
  secondsLeft: 0,
  last_updated: null,
  total_market_cap: 0,
  bitcoin_percentage: 0,
  total_24h_volume: 0,
  history: []
};

// getters
const getters = {
  requestBusy: state => state.requestBusy,
  secondsLeft: state => state.secondsLeft,
  last_updated: state => state.last_updated,
  total_market_cap: state => state.total_market_cap,
  total_24h_volume: state => state.total_24h_volume,
  bitcoin_percentage(state) {
    return [state.bitcoin_percentage, '%'].join('');
  },
  history: state => state.history
};

// actions
const actions = {
  getdata({ commit, state, rootState }) {
    const secondsPassed = (rootState.settings.config.checkEachMinutes * 60) -
      state.secondsLeft;

    // Add throttling for limiting number of requests
    if (secondsPassed <= rootState.constants.secondsThrottling && secondsPassed >= 0) {
      return 'throttling';
    }

    commit('setbusy', true);

    const url = [constants.state.apiUrl(), '/statistics'].join('');
    const ajaxCall = Vue.axios.get(url);

    ajaxCall.then((response) => {
      commit('handleResponse', { response, commit });
      commit('setSecondsLeft', { rootState });
      commit('setbusy', false);
    });

    return ajaxCall;
  },
  updateSecondsLeft({ commit, state, rootState }) {
    let seconds = state.secondsLeft;

    if (seconds < 1) {
      return commit('setSecondsLeft', { rootState });
    }

    seconds -= 1;

    return commit('setSecondsLeft', { rootState, seconds });
  }
};

// mutations
const mutations = {
  setbusy(state, busy) {
    state.requestBusy = busy;
  },
  handleResponse(state, { response }) {
    state.last_updated = response.data.last_updated;
    state.total_market_cap = response.data.total_market_cap;
    state.total_24h_volume = response.data.total_24h_volume;
    state.bitcoin_percentage = response.data.bitcoin_percentage;
    state.history = response.data.history;
  },
  setSecondsLeft(state, { rootState, seconds }) {
    let realSeconds = seconds;

    // if no seconds param passed we overwrite the realSeconds var
    if (!seconds) {
      realSeconds = rootState.settings.config.checkEachMinutes * 60;
    }

    state.secondsLeft = realSeconds;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
