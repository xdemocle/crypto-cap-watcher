<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed right app clipped mobile-break-point="60000">
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>settings</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
            <v-list-tile-sub-title>Crypto Cap Watcher</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch v-model="themeSwitch" color="purple"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>{{themeLabel}} theme</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch v-model="fullscreenSwitch" color="purple"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>
            Fullscreen
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch v-model="showMillionsSwitch" color="purple"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>
            Compact Millions
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch v-model="tetherSwitch" color="purple"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>
            Tether USDT
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="py-0">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <span class="title">Changes</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-layout
        wrap
        align-center
        fluid
        style="max-width: 310px">
        <v-flex xs6 class="pl-3 pr-3 py-2 heading" v-for="(card, index) in timingSorted" v-bind:key="index">
          <v-switch :input-value="card.visible" @click="toggleCardVisibility(card.id)" color="green" :label="card.shortLabel" hide-details></v-switch>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar app fixed>
      <v-layout
        row
        wrap
        align-center
        fluid class="tooltip-container--title">
        <v-flex xs5 sm4 class="text-xs-left tooltip-container--refresh">
          <v-tooltip bottom attach=".tooltip-container--title" content-class="tooltip-content--refresh">
            <v-btn slot="activator" icon @click="refreshData" v-bind:loading="requestProgressHidden">
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>Last updated: {{lastUpdate | moment('HH:mm \\G\\M\\TZ')}}</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs2 sm4 class="text-xs-center">
          <v-tooltip bottom max-width="25rem" min-width="25rem" attach=".tooltip-container--title" content-class="tooltip-content--title">
            <v-toolbar-title slot="activator" class="headline ml-0">
              <span class="hidden-xs-only">{{siteName}}</span>
              <span class="hidden-sm-and-up">{{siteShortName}}</span>
            </v-toolbar-title>
            <div class="text-xs-center">{{siteDescription}}</div>
          </v-tooltip>
        </v-flex>
        <v-flex xs5 sm4 class="text-xs-right menu-container--dropdown tooltip-container--cast">
          <v-tooltip bottom attach=".tooltip-container--cast" content-class="tooltip-content--cast" v-if="castButtonVisibility">
            <v-btn slot="activator" icon @click="toggleCastIcon" v-bind:loading="castConnected === 1">
              <v-icon v-if="castConnected === 2" color="blue">cast_connected</v-icon>
              <v-icon v-else color="inherit">cast</v-icon>
            </v-btn>
            <span>Cast to Google Chromecast</span>
          </v-tooltip>
          <v-btn slot="activator" icon @click="drawer = !drawer">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-flex>

        <v-dialog v-model="throttlingDialog" max-width="30rem">
          <v-card>
            <v-card-title>
              <span class="title">Limit on requests</span>
            </v-card-title>
            <v-card-text>
              In order to not overload <a href="https://www.coinmarketcap.com" target="_new">Coinmarketcap.com</a> services,
              we are limiting the number of refresh of data at <strong>{{secondsThrottling}}</strong> seconds each.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click.stop="throttlingDialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="offlineDialog" max-width="30rem">
          <v-card>
            <v-card-title>
              <span class="title">Internet offline</span>
            </v-card-title>
            <v-card-text>
              Your internet connection if offline, please try again later.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click.stop="offlineDialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-progress-linear height="1" v-bind:indeterminate="true" v-show="requestProgressHidden" class="topbar-request-progress"></v-progress-linear>
    </v-toolbar>
  </div>
</template>

<script>
  import _ from 'lodash';
  import store from '../store';

  export default {
    name: 'Topbar',
    data: () => ({
      fadeToggle: false,
      throttlingDialog: false,
      offlineDialog: false,
      drawer: false
    }),
    computed: {
      themeSwitch: {
        get() {
          return store.state.settings.theme;
        },
        set() {
          if (this.castConnected) {
            this.$chromecast.Sender.sendMessage({
              context: 'commit',
              method: 'switchTheme'
            });
          }

          return store.commit('switchTheme');
        }
      },
      themeLabel() {
        return store.state.settings.theme ? 'Night' : 'Day';
      },
      siteName() {
        return store.state.constants.name;
      },
      siteShortName() {
        return store.state.constants.shortName;
      },
      siteDescription() {
        return store.state.constants.description;
      },
      fullscreenSwitch: {
        get() {
          return store.state.settings.fullscreen;
        },
        set() {
          if (store.state.settings.fullscreen) {
            this.$fullscreen.exit();
          } else {
            this.$fullscreen.enter();
          }

          return store.commit('switchFullscreen');
        }
      },
      showMillionsSwitch: {
        get() {
          return store.state.settings.showMillions;
        },
        set() {
          if (this.castConnected) {
            this.$chromecast.Sender.sendMessage({
              context: 'commit',
              method: 'switchShowMillions'
            });
          }

          return store.commit('switchShowMillions');
        }
      },
      tetherSwitch: {
        get() {
          return store.state.settings.tether;
        },
        set() {
          if (this.castConnected) {
            this.$chromecast.Sender.sendMessage({
              context: 'commit',
              method: 'switchTether'
            });
          }

          return store.commit('switchTether');
        }
      },
      requestProgressHidden() {
        return store.state.history.requestBusy;
      },
      lastUpdate() {
        return store.state.history.last_updated || Date.now();
      },
      secondsThrottling() {
        return store.state.constants.secondsThrottling;
      },
      timingSorted() {
        if (!store.state.settings.config) {
          return null;
        }
        return _.orderBy(store.state.settings.config.timing, 'id');
      },
      castConnected() {
        return store.state.status.casting;
      },
      isChromecast() {
        return store.state.status.isChromecast;
      },
      castButtonVisibility() {
        return store.state.status.castButtonVisibility;
      }
    },
    methods: {
      refreshData() {
        if (!store.state.status.online) {
          this.offlineDialog = true;
          return;
        }

        store.dispatch('getdata').then((response) => {
          this.throttlingDialog = response === 'throttling' || false;

          if (this.castConnected) {
            this.$chromecast.Sender.sendMessage({ method: 'getdata' });
          }
        });
      },
      toggleCardVisibility(id) {
        store.dispatch('updateConfigTiming', { id }).then(() => {
          // We send a sync command to the chromecast receiver
          if (this.castConnected) {
            const timing = _.find(store.state.settings.config.timing, { id });
            const status = timing.visible || false;

            this.$chromecast.Sender.sendMessage({
              method: 'updateConfigTiming',
              payload: { id, status }
            });
          }
        });
      },
      toggleCastIcon() {
        if (store.state.status.casting) {
          this.$chromecast.Sender.stopCasting(() => {
            store.dispatch('updateCastState', 0);
          });
        } else {
          // Send null for loading state
          store.dispatch('updateCastState', 1);
          this.$chromecast.Sender.cast(() => {
            store.dispatch('updateCastState', 2);
          });
        }
      }
    }
  };
</script>

<style lang="scss">
  .topbar-request-progress {
    position: absolute !important;
    bottom: 0;
    margin: 0 !important;
  }

  .tooltip-container--refresh,
  .tooltip-container--title,
  .tooltip-container--cast,
  .menu-container--dropdown {
    position: relative;
    margin-left: 0 !important;
  }

  .tooltip-content--refresh {
    top: 100% !important;
    left: 1rem !important;
  }

  .tooltip-content--title {
    top: 100% !important;
    left: 50% !important;
    margin-left: -12.5rem;
    min-width: 25rem;
  }

  .tooltip-content--cast {
    top: 100% !important;
    right: 2rem !important;
    left: auto !important;
  }

  .menu-container--dropdown .menu__content {
    top: 100% !important;
    right: 5% !important;
    left: auto !important;
  }
</style>
