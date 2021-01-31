import Vue from 'vue'
import Vuex from 'vuex'
import { each } from 'lodash'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const storeOptions = {
  reducer(store) {
    const storeFiltered = {}

    const keys = Object.keys(store)

    each(keys, (key) => {
      if (key === 'constants' || key === 'status') {
        return
      }

      storeFiltered[key] = store[key]
    })

    return storeFiltered
  }
}

export default ({ store }) => {
  createPersistedState(storeOptions)(store)
}
