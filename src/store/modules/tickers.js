/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';
import _ from 'lodash';
import CCC from '@/libs/ccc';
import constants from './constants';

// initial state
const state = {
  connect: false,
  message: null,
  updates: {}
};

// getters
const getters = {
  connect: state => state.connect,
  message: state => state.message,
  updates: state => state.updates
};

// actions
const actions = {
  getTickerData({ commit }, id) {
    const url = [constants.state.apiUrlCoinmarketcap, '/', id, '/'].join('');
    const ajaxCall = Vue.axios.get(url);

    ajaxCall.then((response) => {
      commit('handleTickerResponse', response.data[0]);
    });

    return ajaxCall;
  }
};

// mutations
const mutations = {
  SOCKET_CONNECT(state) {
    state.connect = true;
  },
  SOCKET_DISCONNECT(state) {
    state.connect = false;
  },
  SOCKET_M(state, message) {
    state.message = message;

    if (message && message[0]) {
      const msg = message[0];
      const messageType = msg.substring(0, msg.indexOf('~'));

      if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
        const res = CCC.CURRENT.unpack(msg);
        const updates = CCC.STATIC.UTIL.dataUnpack(res);

        if (!state.updates[updates.FROMSYMBOL]) {
          state.updates[updates.FROMSYMBOL] = {};
        }

        const mergedUpdates = _.merge(state.updates[updates.FROMSYMBOL], updates);

        state.updates[updates.FROMSYMBOL] = mergedUpdates;
      }
    }
  },
  handleTickerResponse(state, data) {
    if (!state.updates[data.symbol]) {
      state.updates[data.symbol] = {};
    }

    state.updates[data.symbol] = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

