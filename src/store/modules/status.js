/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// initial state
const state = {
  online: false
};

// actions
const actions = {
  initializeStatus({ commit }) {
    if (window.addEventListener) {
      // Works well in Firefox and Opera with the
      // Work Offline option in the File menu.
      // Pulling the ethernet cable doesn't seem to trigger it.
      // Later Google Chrome and Safari seem to trigger it well
      window.addEventListener('online', () => {
        commit('setStatus', true);
      }, false);

      window.addEventListener('offline', () => {
        commit('setStatus', false);
      }, false);

      // Also set during bootstrap of the app
      commit('setStatus', window.navigator.onLine);
    } else {
      // Works in IE with the Work Offline option in the
      // File menu and pulling the ethernet cable
      document.body.ononline = () => {
        commit('setStatus', true);
      };

      document.body.onoffline = () => {
        commit('setStatus', false);
      };
    }
  }
};

// mutations
const mutations = {
  setStatus(state, connectionStatus) {
    state.online = connectionStatus;
  }
};

export default {
  state,
  actions,
  mutations
};
