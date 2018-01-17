<template>
  <v-footer inset fixed class="px-3">
    <v-layout row wrap align-center justify-space-between>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left ellipsis">
        <p class="mb-0 text-muted">
          <v-tooltip top right class="d-inline" v-model="connectionOffline" close-delay="1500">
            <v-icon :color="connectionOffline ? 'red' : ''" slot="activator" class="mr-1 hidden-xs-only">wifi</v-icon>
            <span v-if="connectionOffline">Internet offline</span>
            <span v-if="!connectionOffline">Internet online</span>
          </v-tooltip>
          Interface updates in {{counterSeconds}} seconds
        </p>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right ellipsis">
        <p class="mb-0 text-muted" style="position: relative;">
          Data served by <a href="https://coinmarketcap.com" target="_new" class="text-decoration-none">coinmarketcap.com</a> | Hosted on
          <a href="https://github.com/xdemocle/crypto-cap-watcher" target="_new" class="text-decoration-none">Github</a>
          <v-tooltip top>
            <a slot="activator" href="https://github.com/xdemocle/crypto-cap-watcher/issues" target="_new" class="text-decoration-none"><v-icon class="ml-1 hidden-xs-only">help_outline</v-icon></a>
            <span>Open a support ticket or send a bug on Github</span>
          </v-tooltip>
          </p>
      </v-flex>
    </v-layout>
  </v-footer>

</template>

<script>
  import store from '../store';

  export default {
    name: 'Bottombar',
    computed: {
      counterSeconds() {
        return store.state.history.secondsLeft;
      },
      connectionOffline: {
        get() {
          return !store.state.status.online;
        },
        set() {
          return null;
        }
      }
    }
  };
</script>

<style type="scss">
</style>
