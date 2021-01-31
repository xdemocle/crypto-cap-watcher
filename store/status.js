/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import _ from 'lodash'
import Visibility from 'visibilityjs'

// actions
export const actions = {
  initializeStatus({ commit }, onResizeHandler) {
    Visibility.change((e, visible) => {
      commit('setPageActive', visible === 'visible')
    })

    if (window.addEventListener) {
      // Works well in Firefox and Opera with the
      // Work Offline option in the File menu.
      // Pulling the ethernet cable doesn't seem to trigger it.
      // Later Google Chrome and Safari seem to trigger it well
      window.addEventListener(
        'online',
        () => {
          commit('setStatus', true)
        },
        false
      )

      window.addEventListener(
        'offline',
        () => {
          commit('setStatus', false)
        },
        false
      )

      // Also set during bootstrap of the app
      commit('setStatus', window.navigator.onLine)

      // Register an event listener when the Vue app is ready
      if (onResizeHandler) {
        window.addEventListener('resize', _.debounce(onResizeHandler, 10))
      }
    } else {
      // Works in IE with the Work Offline option in the
      // File menu and pulling the ethernet cable
      document.body.ononline = () => {
        commit('setStatus', true)
      }

      document.body.onoffline = () => {
        commit('setStatus', false)
      }
    }
  },
  updateIsChromecast({ commit }, value) {
    commit('setIsChromecast', value)
  },
  updateCastState({ commit }, status) {
    commit('switchCast', { status })
  },
  updateCastButtonVisibilityState({ commit }, status) {
    commit('switchCastButtonVisibility', { status })
  }
}

// mutations
export const mutations = {
  setStatus(state, connectionStatus) {
    state.online = connectionStatus
  },
  setPageActive(state, visibility) {
    state.pageActive = visibility
  },
  setIsChromecast(state, value) {
    state.isChromecast = value
  },
  switchCast(state, { status }) {
    state.casting = status
  },
  switchCastButtonVisibility(state, { status }) {
    state.castButtonVisibility = status
  }
}

export const state = () => ({
  online: false,
  pageActive: true,
  isChromecast: false,
  casting: 0,
  castButtonVisibility: true
})
