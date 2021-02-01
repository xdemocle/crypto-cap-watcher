export default {
  data() {
    return {
      registration: null,
      snackbarAppUpdateExists: false
    }
  },
  computed: {
    version() {
      if (window && window.app && window.app.version) {
        return window.app.version
      }
      return '0.0.0'
    },
    git() {
      if (window && window.app && window.app.git) {
        return window.app.git
      }
      return {}
    },
    isProd() {
      return this.git.branch === 'master'
    },
    deploymentBranch() {
      if (this.git.branch) {
        return ` - ${this.git.branch}`
      }

      return ''
    },
    deploymentCommit() {
      if (this.isProd) {
        return ''
      }

      if (this.git.commitDetails) {
        return this.git.commitDetails
      }

      return ''
    }
  },
  created() {
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
  },
  methods: {
    appReload() {
      this.closeRefreshUI()

      if (!this.registration) {
        return
      }

      // We overwrite the persistMemoryCache in the global window object
      window.persistMemoryCache = () => {}

      // And then we proceed with our routine for resetting the local cache.
      window.localStorage.clear()
      this.registration.unregister()

      setTimeout(() => window.location.reload(true), 250)
    },
    showRefreshUI(e) {
      this.registration = e.detail
      this.snackbarAppUpdateExists = true
    },
    closeRefreshUI() {
      this.snackbarAppUpdateExists = false
    }
  }
}
