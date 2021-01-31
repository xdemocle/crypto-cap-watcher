import Vue from 'vue'
import _ from 'lodash'
import Utils from '../libs/utils'

// getters
export const getters = {
  theme: (state) => state.theme,
  fullscreen: (state) => state.fullscreen,
  tether: (state) => state.tether,
  ethereum: (state) => state.ethereum,
  showMillions: (state) => state.showMillions,
  config: (state) => state.config
}

// actions
export const actions = {
  updateConfigTiming({ commit, state }, { id, status }) {
    const timing = _.clone(state.config.timing)
    const index = _.findIndex(timing, { id })
    let visible = timing[index].visible || false

    // We force the param status or we toggle visible prop
    visible = !_.isUndefined(status) ? status : !visible

    commit('setTimingWrapper', { index, visible })
  },
  async getsettings({ commit, rootState }, callback) {
    const url = [rootState.constants.apiUrl(), '/settings'].join('')
    await this.$axios.get(url).then((response) => {
      commit('setConfig', { response, callback })
    })
  },
  updateContainer({ commit }, response) {
    commit('setContainer', response)
  }
}

// mutations
export const mutations = {
  switchTheme(state) {
    state.theme = !state.theme
  },
  switchEthereum(state) {
    state.ethereum = !state.ethereum
  },
  switchFullscreen(state) {
    state.fullscreen = !state.fullscreen
  },
  switchTether(state) {
    state.tether = !state.tether
  },
  switchShowMillions(state) {
    state.showMillions = !state.showMillions
  },
  resetFullscreen(state) {
    state.fullscreen = false
  },
  setConfig(state, { response, callback }) {
    const { checkEachMinutes } = response.data

    // Don't look at the two iterators below, your eyes could bleeds :D
    if (state.config && state.config.timing) {
      _.each(state.config.timing, (timing, index) => {
        if (timing) {
          const item = _.find(response.data.timing, { id: timing.id })

          if (!item) {
            Vue.delete(state.config.timing, index)
          }
        }
      })

      _.each(response.data.timing, (timing, index) => {
        const item = _.find(state.config.timing, { id: timing.id })

        if (item) {
          const timingUpd = timing
          timingUpd.visible = state.config.timing[index].visible
          Vue.set(state.config.timing, index, timingUpd)
        } else {
          state.config.timing.push(timing)
        }
      })
    } else {
      state.config = response.data
    }

    state.config.checkEachMinutes = checkEachMinutes

    if (callback) {
      callback()
    }
  },
  setTimingWrapper(state, { index, visible }) {
    state.config.timing[index].visible = visible
  },
  setContainer(state, newState) {
    return Utils.setValuesShadow(state, newState)
  }
}

export const state = () => ({
  theme: true,
  fullscreen: false,
  tether: false,
  ethereum: true,
  showMillions: true,
  config: {}
})
