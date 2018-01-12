<template>
  <div>
    <v-toolbar app fixed clipped-left scroll-off-screen>
      <v-layout
        row
        wrap
        align-center
        fluid>
        <v-flex sm4 class="text-xs-left hidden-xs-only">
          <v-toolbar-title class="subheading">
            Updated: <span class="dynamic-placeholder">{{lastUpdate | moment('HH:mm \\G\\M\\TZ')}}</span>
          </v-toolbar-title>
        </v-flex>
        <v-flex xs8 sm4 class="text-xs-left text-sm-center">
          <v-toolbar-title class="headline">{{siteName}}</v-toolbar-title>
        </v-flex>
        <v-flex xs4 sm4 class="text-xs-right" justify-space-around>
          <v-btn flat icon @click="refreshData" v-bind:loading="requestProgressHidden">
            <v-icon>refresh</v-icon>
          </v-btn>
          <v-menu
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

                <v-divider></v-divider>

                <v-list-tile v-for="(card, index) in timing" v-bind:key="index">
                  <v-list-tile-action>
                    <v-switch :input-value="card.visible" @click="toggleCardVisibility(card.id)" color="green"></v-switch>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    {{card.label}}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-menu>
        </v-flex>
        <v-progress-linear height="1" v-bind:indeterminate="true" v-show="requestProgressHidden" class="request-progress"></v-progress-linear>
      </v-layout>
    </v-toolbar>

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
  </div>
</template>

<script>
  import store from '../store';

  export default {
    name: 'Topbar',
    data: () => ({
      fadeToggle: false,
      throttlingDialog: false
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
      requestProgressHidden() {
        return store.state.history.requestBusy;
      },
      lastUpdate() {
        return store.state.history.last_updated;
      },
      secondsThrottling() {
        return store.state.constants.secondsThrottling;
      },
      timing() {
        if (!store.state.settings.config) {
          return null;
        }
        return store.state.settings.config.timing;
      }
    },
    methods: {
      refreshData() {
        const secondsPassed = (this.$store.state.constants.checkEachMinutes * 60) -
          this.$store.state.history.secondsLeft;

        // Add throttling for limiting number of requests
        if (secondsPassed <= this.$store.state.constants.secondsThrottling) {
          this.throttlingDialog = true;
          return null;
        }

        return this.$store.dispatch('getdata');
      },
      toggleCardVisibility(id) {
        this.$store.dispatch('updateConfigTiming', id);
      }
    }
  };
</script>

<style type="scss" scoped>
  .request-progress {
    position: absolute;
    bottom: 0;
    margin: 0;
  }
</style>
