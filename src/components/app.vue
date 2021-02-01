<template>
  <v-app :dark="theme">
    <Topbar />
    <v-main>
      <router-view />
<!--
      <div class="app-version">
        {{ version }}
        <span v-if="!isProd">{{ deploymentBranch }}</span>
      </div>
      <v-snackbar
        v-model="snackbarAppUpdateExists"
        color="info"
        :timeout="0"
        bottom
        right
      >
        {{ $t('app.updateMessage') }}
        <v-btn text color="white" @click="appReload()">
          {{ $t('app.reload') }}
        </v-btn>
        <v-btn text icon color="white" class="ml-0" @click="closeRefreshUI()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar> -->
    </v-main>
    <Bottombar />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import appMixin from '../libs/app.mixin'
import Topbar from '@/components/Topbar'
import Bottombar from '@/components/Bottombar'

let intervalChecker = null

export default {
  components: {
    Topbar,
    Bottombar
  },
  // data: () => ({
  // }),
  mixins: [appMixin],
  computed: {
    ...mapState({
      theme: (state) => state.settings.theme,
      pageActive: (state) => state.status.pageActive,
      connectionOffline: (state) => !state.status.online
    })
  },
  watch: {
    pageActive(status) {
      if (status) {
        this.getdata(true)
      }
    }
  },
  methods: {
    bootstrap() {
      // First get remote settings than start the setInterval for updating
      // local data from history and secondsLeft from next request.
      this.$store
        .dispatch('settings/getsettings', () => {
          if (!intervalChecker) {
            intervalChecker = window.setInterval(this.updateSecondsLeft, 1000)
          }
        })
        .catch(() => {
          // If network error try again with setTimeout
          setTimeout(this.bootstrap, 1500)
        })

      // Trigger onResize window event
      this.onResize()
    },
    getdata(forced) {
      return this.$store.dispatch('getdata', forced)
    },
    updateSecondsLeft() {
      // Run at interval a new request
      if (this.$store.state.history.secondsLeft <= 1) {
        return this.getdata()
      }

      return this.$store.dispatch('updateSecondsLeft')
    },
    onResize() {},
    updateDashboardBody() {
      const pageDocument = document.querySelector('html')
      const dashboardHeader = document.querySelector('.dashboard__header')
      const dashboardBody = document.querySelector('.dashboard__body')
      const pageFooter = document.querySelector('footer.footer')

      const dashboardBodyHeight =
        pageDocument.clientHeight -
        dashboardHeader.clientHeight -
        pageFooter.clientHeight

      dashboardBody.style.setProperty('height', dashboardBodyHeight)
      dashboardBody.style.height = `${dashboardBodyHeight}px`
    }
  },
  created() {
    // Initialize store container for internet, app status and window events
    this.$store.dispatch('initializeStatus', this.onResize)

    // Always restore fullscreen flag at bootstrap
    this.$store.commit('settings/resetFullscreen')

    // Bootstrap the app settings and other tickers
    this.bootstrap()

    // that.$socket.emit('ping');

    // Subscribe to cryptocompare websocket for bitcoin price
    this.$store.subscribe((mutation, state) => {
      if (mutation && mutation.type === 'SOCKET_CONNECT') {
        this.$socket.emit('SubAdd', {
          subs: state.constants.wsCccSubscriptions
        })

        window.socket = this.$socket
      }
    })

    // Subscribe to getdata action in order to retrieve make another call
    // this.$store.subscribeAction((action) => {
    //   if (action.type === 'getdata') {
    //     if (this.$store.state.status.online) {
    //       this.$store.dispatch('getTickerData', 'tether')
    //     }
    //   }
    // })
  }
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'

html
  font-size: 11px

@media #{map-get($display-breakpoints, 'sm-and-up')}
  html
    font-size: 12px

@media #{map-get($display-breakpoints, 'md-and-up')}
  html
    font-size: 13px

@media #{map-get($display-breakpoints, 'lg-and-up')}
  html
    font-size: 14px

@media #{map-get($display-breakpoints, 'xl-only')}
  html
    font-size: 16px
</style>

<style lang="sass">
.card
  &__title
    padding: 1rem

    &--primary
      padding-top: 1.5rem

  &__text
    padding: 1rem

.toolbar
  &__title
    margin-left: 1rem

  &--fixed
    z-index: 5

.footer
  &--inset
    z-index: 4

.list
  &__tile
    padding: 0 1rem

    &__title
      height: 1.5rem
      line-height: 1.5rem

/**
 * CUSTOM STYLES
 */
.d-flex-auto-width
  display: flex
  flex-grow: 1
  flex-basis: 0

  & > *
    flex: 1 1 auto !important

.content-vertical-center > *
  flex-direction: column
  justify-content: center
  display: flex

.text-decoration-none
  text-decoration: none

.vertical-align-middle
  vertical-align: middle
</style>
