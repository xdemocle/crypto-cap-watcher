<template>
  <div>
    <v-toolbar app fixed clipped-left scroll-off-screen>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-layout
        row
        wrap
        align-center
        fluid>
        <v-flex sm4 class="text-xs-left hidden-xs-only">
          <!-- <v-toolbar-title class="title">{{clock}}</v-toolbar-title> -->
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
            offset-y
            :close-on-content-click="false">
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-switch v-model="themeSwitch" color="green"></v-switch>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{theme}} theme
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-switch v-model="fullscreenSwitch" color="green"></v-switch>
                </v-list-tile-action>
                <v-list-tile-title>
                  Fullscreen
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile v-for="(card, index) in timing" v-bind:key="index">
                <v-list-tile-action>
                  <v-switch :input-value="card.visible" @click="toggleCardVisibility(card.id)" color="green"></v-switch>
                </v-list-tile-action>
                <v-list-tile-title>
                  {{card.label}}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-progress-linear height="1" v-bind:indeterminate="true" v-show="requestProgressHidden" class="request-progress"></v-progress-linear>
      </v-layout>
    </v-toolbar>
    <!--
    <v-navigation-drawer
      clipped
      temporary
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
  </div>
</template>

<script>
  import store from '../store';

  export default {
    name: 'Topbar',
    data: () => ({
      fadeToggle: false
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
      // clock() {
      //   return store.state.clock.time;
      // },
      requestProgressHidden() {
        return store.state.history.requestBusy;
      },
      lastUpdate() {
        return store.state.history.last_updated;
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
