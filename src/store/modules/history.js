/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';
import constants from './constants';

// initial state
const state = {
  lastRequest: null,
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
  lastRequest: state => state.lastRequest,
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
  getdata({ commit }) {
    // TODO: add throttling for limiting number of requests
    // if (state.lastRequest) {
    // }

    commit('setbusy', true);

    const url = [constants.state.apiUrl(), '/statistics'].join('');
    const ajaxCall = Vue.axios.get(url);

    ajaxCall.then((response) => {
      commit('handleResponse', { response, commit });
      commit('restoreSecondsLeft');
      commit('setbusy', false);
    });

    return ajaxCall;
  },
  updateSecondsLeft({ commit, state }) {
    let secondsLeft = state.secondsLeft;

    if (secondsLeft < 1) {
      return commit('restoreSecondsLeft');
    }

    secondsLeft -= 1;

    commit('setSecondsLeft', secondsLeft);

    return null;
  }
};

// mutations
const mutations = {
  setbusy(state, busy) {
    state.requestBusy = busy;
  },
  handleResponse(state, { response, commit }) {
    state.last_updated = response.data.last_updated;
    state.total_market_cap = response.data.total_market_cap;
    state.total_24h_volume = response.data.total_24h_volume;
    state.bitcoin_percentage = response.data.bitcoin_percentage;
    state.history = response.data.history;
    commit('setConfig', response.data.config);
  },
  restoreSecondsLeft(state) {
    state.secondsLeft = constants.state.checkEachMinutes * 60;
  },
  setSecondsLeft(state, seconds) {
    state.secondsLeft = seconds;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
