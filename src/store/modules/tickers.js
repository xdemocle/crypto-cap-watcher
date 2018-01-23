/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';
import _ from 'lodash';
import CCC from '@/libs/ccc';

// initial state
const state = {
  connect: false,
  updates: {}
};

// getters
const getters = {
  connect: state => state.connect,
  updates: state => state.updates
};

// actions
const actions = {
  getTickerData({ commit, rootState }, id) {
    const url = [rootState.constants.apiUrlCoinmarketcap, '/', id, '/'].join('');
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
    // debugger;
    state.connect = true;
  },
  SOCKET_DISCONNECT(state) {
    // debugger;
    state.connect = false;
  },
  // SOCKET_RECONNECT(state) {
  //   debugger
  // },
  // SOCKET_RECONNECT_ATTEMPT(state) {
  //   debugger
  // },
  // SOCKET_PING(state) {
  //   debugger
  // },
  // SOCKET_PONG(state) {
  //   debugger
  // },
  SOCKET_M(state, message) {
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

