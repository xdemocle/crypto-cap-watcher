/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios'

// getters
const getters = {
  requestBusy: state => state.requestBusy,
  secondsLeft: state => state.secondsLeft,
  secondsPassed(state, rootState) {
    return (
      rootState['settings/config'].checkEachMinutes * 60 - state.secondsLeft
    )
  },
  last_updated: state => state.last_updated,
  clientLastUpdated: state => state.clientLastUpdated,
  total_market_cap: state => state.total_market_cap,
  total_24h_volume: state => state.total_24h_volume,
  bitcoin_percentage(state) {
    return [state.bitcoin_percentage, '%'].join('')
  },
  ethereum_percentage(state) {
    return [state.ethereum_percentage, '%'].join('')
  },
  history: state => state.history
}

// actions
const actions = {
  getdata({ commit, rootState }, bypass) {
    if (!bypass) {
      const { secondsPassed } = this.getters

      // Add throttling for limiting number of requests
      if (
        secondsPassed <= rootState.constants.secondsThrottling &&
        secondsPassed >= 0
      ) {
        return 'throttling'
      }
    }

    commit('setbusy', true)

    const url = [rootState.constants.apiUrl, '/statistics'].join('')
    const ajaxCall = axios.get(url)

    ajaxCall
      .then(response => {
        commit('handleResponse', { response, commit })
        commit('setSecondsLeft', { rootState })
        commit('setbusy', false)
      })
      .catch(() => {
        commit('setbusy', false)
        setTimeout(() => this.dispatch('getData', bypass), 1500)
      })

    return ajaxCall
  },
  updateSecondsLeft({ commit, state, rootState }) {
    let seconds = state.secondsLeft

    if (seconds < 1) {
      return commit('setSecondsLeft', { rootState })
    }

    seconds -= 1

    return commit('setSecondsLeft', { rootState, seconds })
  }
}

// mutations
const mutations = {
  setbusy(state, busy) {
    state.requestBusy = busy
  },
  handleResponse(state, { response }) {
    state.clientLastUpdated = new Date().getTime() / 1000
    state.last_updated = response.data.last_updated
    state.total_market_cap = response.data.total_market_cap
    state.total_24h_volume = response.data.total_24h_volume
    state.bitcoin_percentage = response.data.bitcoin_percentage
    state.ethereum_percentage = response.data.ethereum_percentage
    state.history = response.data.history
  },
  setSecondsLeft(state, { rootState, seconds }) {
    let realSeconds = seconds

    // if no seconds param passed we overwrite the realSeconds var
    if (!seconds) {
      realSeconds = rootState.settings.config.checkEachMinutes * 60
    }

    state.secondsLeft = realSeconds
  }
}

// initial states
const state = {
  requestBusy: false,
  secondsLeft: 0,
  last_updated: null,
  clientLastUpdated: null,
  total_market_cap: 0,
  bitcoin_percentage: 0,
  ethereum_percentage: 0,
  total_24h_volume: 0,
  history: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
