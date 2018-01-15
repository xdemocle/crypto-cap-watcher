/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import _ from 'lodash';
import CCC from '@/libs/ccc';

// initial state
const state = {
  connect: false,
  message: null,
  updates: null
};

// getters
const getters = {
  connect: state => state.connect,
  message: state => state.message,
  updates: state => state.updates
};

// actions
const actions = {
  socket_userMessage: (context, message) => {
    // context.dispatch('newMessage', message);
    context.commit('NEW_MESSAGE_RECEIVED', message);
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

        state.updates = _.merge(state.updates, updates);
      }
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

