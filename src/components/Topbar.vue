<template>
  <div>
    <v-toolbar app fixed clipped-left scroll-off-screen>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-menu
        offset-y
        :close-on-content-click="false"
        :nudge-width="200">
        <v-btn slot="activator" icon>
          <!-- <v-icon>more_vert</v-icon> -->
          <v-icon>menu</v-icon>
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
        </v-list>
      </v-menu>
      <v-toolbar-title>{{siteName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="title">{{clock}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="subheading">
        Last update: <span class="dynamic-placeholder">{{lastUpdate | moment("Do MMMM YYYY - HH:mm:ss")}}</span>
      </v-toolbar-title>
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
      clock() {
        return store.state.clock.time;
      },
      lastUpdate() {
        return store.state.history.lastUpdate;
      }
    }
  };
</script>

<style type="scss">
  .dynamic-placeholder {
    transition: opacity 0.25s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
</style>
