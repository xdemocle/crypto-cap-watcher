<template>
  <v-app id="app" :dark="theme" ref="appcomponent" :class="appClass.join(' ')">
    <topbar></topbar>
    <v-content>
      <dashboard></dashboard>
    </v-content>
    <bottombar></bottombar>
  </v-app>
</template>

<script>
  import _ from 'lodash';
  import Vue from 'vue';
  import FontFaceObserver from 'fontfaceobserver';
  import Topbar from '@/components/Topbar';
  import Bottombar from '@/components/Bottombar';
  import Dashboard from '@/components/Dashboard';
  import store from './store';

  let intervalChecker = null;

  export default {
    data: () => ({
      appClass: [
        'material-icons-notready'
      ]
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
      },
      isChromecast() {
        return this.$store.state.status.isChromecast;
      }
    },
    components: {
      Topbar,
      Bottombar,
      Dashboard
    },
    methods: {
      bootstrap() {
        // First get remote settings than start the setInterval for updating
        // local data from history and secondsLeft from next request.
        this.$store.dispatch('getsettings', () => {
          if (!intervalChecker) {
            intervalChecker = window.setInterval(this.updateSecondsLeft, 1000);
          }
        }).catch(() => {
          // If network error try again with setTimeout
          setTimeout(this.bootstrap, 1500);
        });

        // Trigger onResize window event
        this.onResize();
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
      onResize() {
        this.$store.dispatch('updateIsChromecast', this.checkIfChromecast());

        // Update
        if (this.isChromecast) {
          Vue.nextTick(() => {
            this.updateDashboardBody();
          });
        }
      },
      checkIfChromecast() {
        const isChromecast = navigator.userAgent.indexOf('CrKey') !== -1;

        if (isChromecast) {
          document.querySelector('html').classList.add('is-chromecast');
        } else {
          document.querySelector('html').classList.remove('is-chromecast');
        }

        return isChromecast;
      },
      updateDashboardBody() {
        const pageDocument = document.querySelector('html');
        const dashboardHeader = document.querySelector('.dashboard__header');
        const dashboardBody = document.querySelector('.dashboard__body');
        const pageFooter = document.querySelector('footer.footer');

        const dashboardBodyHeight = pageDocument.clientHeight -
          dashboardHeader.clientHeight - pageFooter.clientHeight;

        dashboardBody.style.setProperty('height', dashboardBodyHeight);
        dashboardBody.style.height = `${dashboardBodyHeight}px`;
      }
    },
    created() {
      // Font face observer for material icons
      const materialIconsObserver = new FontFaceObserver('Material Icons');
      materialIconsObserver.load().then(() => {
        const index = this.appClass.indexOf('material-icons-notready');
        this.appClass.splice(index, 1);
        this.appClass.push('material-icons-ready');
      });

      // Initialize store container for internet, app status and window events
      this.$store.dispatch('initializeStatus', this.onResize);

      // Always restore fullscreen flag at bootstrap
      this.$store.commit('resetFullscreen');

      // Bootstrap the app settings and other tickers
      this.bootstrap();

      // that.$socket.emit('ping');

      // Subscribe to cryptocompare websocket for bitcoin price
      this.$store.subscribe((mutation, state) => {
        if (mutation && mutation.type === 'SOCKET_CONNECT') {
          this.$socket.emit('SubAdd', {
            subs: state.constants.wsCccSubscriptions
          });

          window.socket = this.$socket;
        }
      });

      // Subscribe to getdata action in order to retrieve make another call
      this.$store.subscribeAction((action) => {
        if (action.type === 'getdata') {
          if (this.$store.state.status.online) {
            this.$store.dispatch('getTickerData', 'tether');
          } else {
            // If network error try again
            setTimeout(this.getdata, 1500);
          }
        } else if (action.type === 'getTickerData') {
          if (!this.$store.state.status.online) {
            // If network error try again
            setTimeout(() => {
              this.$store.dispatch('getTickerData', 'tether');
            }, 1500);
          }
        }
      });
    },
    mounted() {
      // If is a chromecast device receiver app we force the hiding the button
      if (this.$chromecast.Receiver) {
        this.$store.dispatch('updateCastButtonVisibilityState', false);
      }

      this.$chromecast.$on('message', (message) => {
        let data = message;

        if (_.isString(message)) {
          data = JSON.parse(message);
        }

        data.context = !data.context ? 'dispatch' : data.context;

        store[data.context](data.method, data.payload);
      });

      this.$chromecast.$on('sessionUpdate', (status) => {
        // Default for cancel/removed/timeout state or error or disconnected
        let statusCode = 0;

        if (status === 'new' || status === 'updated') {
          statusCode = 2;
        } else if (status === 'connecting' || status === 'disconnecting') {
          statusCode = 1;
        }

        this.$store.dispatch('updateCastState', statusCode);
      });
    },
    watch: {
      pageActive(status) {
        if (status) {
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

  // Styling for chromcast devices
  html.is-chromecast {
    overflow: hidden;
    font-size: 12px !important;

    .dashboard {
      &__container {
        padding: 0;
      }

      &__header {
        flex: 0 0 auto;
      }

      &__body {
        height: 80vh;
        flex: 1 1 auto;
        overflow-y: scroll;
      }
    }

    .toolbar .toolbar__content {
      height: 1px !important;

      .progress-linear {
        height: 1px !important;
      }

      & > .layout {
        display: none;
      }
    }

    main.content {
      padding-top: 0 !important;
    }

    .hidden-if-chromecast {
      display: none !important;
    }
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
