import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import constants from './modules/constants';
// import clock from './modules/clock';
import settings from './modules/settings';
import history from './modules/history';

const _ = require('lodash');

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const storeOptions = {
  reducer(store) {
    const storeFiltered = {};

    const keys = Object.keys(store);

    _.each(keys, (key) => {
      if (key === 'constants' || key === 'clock') {
        return;
      }

      storeFiltered[key] = store[key];
    });

    return storeFiltered;
  }
};

export default new Vuex.Store({
  modules: {
    constants,
    // clock,
    settings,
    history
  },
  plugins: [createPersistedState(storeOptions)],
  strict: debug
});
