/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// initial state
const state = {
  time: null
};

// getters
const getters = {
  time: state => state.time
};

// actions
const actions = {
  updateClock({ commit }) {
    const currentTime = new Date();
    const currentHours = ['0', currentTime.getHours()].join('').slice(-2);
    const currentMinutes = ['0', currentTime.getMinutes()].join('').slice(-2);
    const currentSeconds = ['0', currentTime.getSeconds()].join('').slice(-2);

    const clock = [
      currentHours,
      ':',
      currentMinutes,
      ':',
      currentSeconds
    ].join('');

    commit('updateClock', clock);
  }
};

// mutations
const mutations = {
  updateClock(state, clock) {
    state.time = clock;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
