import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import constants from './modules/constants';
import history from './modules/history';
import settings from './modules/settings';
import tickers from './modules/tickers';

const _ = require('lodash');

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const storeOptions = {
  reducer(store) {
    const storeFiltered = {};

    const keys = Object.keys(store);

    _.each(keys, (key) => {
      if (key === 'constants') {
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
    history,
    settings,
    tickers
  },
  plugins: [createPersistedState(storeOptions)],
  strict: debug
});
