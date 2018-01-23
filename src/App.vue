<template>
  <v-app id="app" :dark="theme" :class="appClass">
    <topbar></topbar>
    <v-content>
      <dashboard></dashboard>
    </v-content>
    <bottombar></bottombar>
  </v-app>
</template>

<script>
  import FontFaceObserver from 'fontfaceobserver';
  import Topbar from '@/components/Topbar';
  import Bottombar from '@/components/Bottombar';
  import Dashboard from '@/components/Dashboard';
  import store from './store';

  let intervalChecker = null;

  export default {
    data: () => ({
      appClass: 'material-icons-notready'
    }),
    computed: {
      theme() {
        return this.$store.state.settings.theme;
      },
      pageActive() {
        return this.$store.state.status.pageActive;
      },
      connectionOffline() {
        return !this.$store.state.status.online;
      }
    },
    components: {
      Topbar,
      Bottombar,
      Dashboard
    },
    created() {
      const that = this;

      // Font face observer for material icons
      const materialIconsObserver = new FontFaceObserver('Material Icons');
      materialIconsObserver.load().then(() => {
        that.appClass = that.appClass.replace('material-icons-notready',
          'material-icons-ready');
      });

      // Initialize store container for internet and app status
      this.$store.dispatch('initializeStatus');

      // Always restore fullscreen flag at bootstrap
      this.$store.commit('resetFullscreen');

      // Bootstrap the app settings and other tickers
      this.bootstrap();

      // that.$socket.emit('ping');

      // Subscribe to cryptocompare websocket for bitcoin price
      this.$store.subscribe((mutation, state) => {
        if(mutation && mutation.type === 'SOCKET_CONNECT') {
          that.$socket.emit('SubAdd', {
            subs: state.constants.wsCccSubscriptions
          });

          window.socket = that.$socket;
        }

        // if(mutation && mutation.type === 'SOCKET_DISCONNECT') {

        // }
      });

      // Subscribe to getdata action in order to retrieve make another call
      this.$store.subscribeAction((action) => {
        if (action.type === 'getdata') {
          if (this.$store.state.status.online) {
            that.$store.dispatch('getTickerData', 'tether');
          } else {
            // If network error try again
            setTimeout(that.getdata, 1500);
          }
        } else if (action.type === 'getTickerData') {
          if (!this.$store.state.status.online) {
            // If network error try again
            setTimeout(() => {
              that.$store.dispatch('getTickerData', 'tether');
            }, 1500);
          }
        }
      });
    },
    methods: {
      bootstrap() {
        const that = this;

        // First get remote settings than start the setInterval for updating
        // local data from history and secondsLeft from next request.
        this.$store.dispatch('getsettings', () => {
          if (!intervalChecker) {
            intervalChecker = window.setInterval(that.updateSecondsLeft, 1000);
          }
        }).catch(() => {
          // If network error try again with setTimeout
          setTimeout(that.bootstrap, 1500);
        });
      },
      getdata(forced) {
        return this.$store.dispatch('getdata', forced);
      },
      updateSecondsLeft() {
        // Run at interval a new request
        if (this.$store.state.history.secondsLeft <= 1) {
          return this.getdata();
        }

        return this.$store.dispatch('updateSecondsLeft');
      },
      checkLastUpdateIsOld() {
        if (!this.$store.state.history.clientLastUpdated) {
          return false;
        }

        const now = (new Date()).getTime() / 1000;
        const isOlder = now - this.$store.state.history.clientLastUpdated >
          this.$store.state.settings.config.checkEachMinutes * 60;

        return isOlder;
      }
    },
    watch: {
      pageActive(status) {
        if (status && this.checkLastUpdateIsOld()) {
          this.getdata(true);
        }
      }
    }
  };
</script>

<style lang="scss">
  .dynamic-placeholder {
    transition: opacity 0.25s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    opacity: 1;;
  }

  .opa-a {
    opacity: 0;
  }
</style>

<style lang="stylus">
  @import '_variables'
  @import '~vuetify/src/stylus/main'
  @import '_modifier'

  html
    font-size: 11px

  @media $display-breakpoints.sm-and-up
    html
      font-size: 12px

  @media $display-breakpoints.md-and-up
    html
      font-size: 13px

  @media $display-breakpoints.lg-and-up
    html
      font-size: 14px

  @media $display-breakpoints.xl-only
    html
      font-size: 16px
</style>
