<template>
  <v-toolbar app fixed>
    <v-layout
      row
      wrap
      align-center
      fluid>
      <v-flex xs2 sm4 class="text-xs-left">
        <v-tooltip bottom>
          <v-btn slot="activator" flat icon @click="refreshData" v-bind:loading="requestProgressHidden">
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>Last updated: {{lastUpdate | moment('HH:mm \\G\\M\\TZ')}}</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs8 sm4 class="text-xs-center">
        <v-tooltip bottom max-width="25rem">
          <v-toolbar-title slot="activator" class="headline ml-0">{{siteName}}</v-toolbar-title>
          <span>{{siteDescription}}</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs2 sm4 class="text-xs-right">
        <v-menu
          slot="activator"
          offset-x
          offset-y
          :nudge-width="260"
          :close-on-content-click="false">
          <v-btn slot="activator" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-card>
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
                <v-list-tile-title>{{theme}} theme</v-list-tile-title>
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
          </v-card>
        </v-menu>
      </v-flex>
      <v-progress-linear height="1" v-bind:indeterminate="true" v-show="requestProgressHidden" class="topbar-request-progress"></v-progress-linear>
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
  </v-toolbar>
</template>

<script>
  import _ from 'lodash';
  import store from '../store';

  export default {
    name: 'Topbar',
    data: () => ({
      fadeToggle: false,
      throttlingDialog: false,
      offlineDialog: false
    }),
    computed: {
      themeSwitch: {
        get() {
          return store.state.settings.theme;
        },
        set() {
          return store.commit('switchTheme');
        }
      },
      theme() {
        return store.state.settings.theme ? 'Night' : 'Day';
      },
      siteName() {
        return store.state.constants.name;
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
          return store.commit('switchShowMillions');
        }
      },
      tetherSwitch: {
        get() {
          return store.state.settings.tether;
        },
        set() {
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
      }
    },
    methods: {
      refreshData() {
        if (!this.$store.state.status.online) {
          this.offlineDialog = true;
          return;
        }

        this.$store.dispatch('getdata').then((response) => {
          this.throttlingDialog = response === 'throttling' || false;
        });
      },
      toggleCardVisibility(id) {
        this.$store.dispatch('updateConfigTiming', id);
      }
    }
  };
</script>

<style>
  .topbar-request-progress {
    position: absolute;
    bottom: 0;
    margin: 0;
  }
</style>
