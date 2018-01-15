<template>
  <v-footer inset fixed class="pa-3">
    <v-layout row wrap align-center justify-space-between>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left ellipsis">
        <p class="mb-0 text-muted">Interface updates in {{counterSeconds}} seconds</p>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right ellipsis">
        <p class="mb-0 text-muted">Data served by <a href="https://coinmarketcap.com" target="_new">coinmarketcap.com</a> | Hosted on <a href="https://github.com/xdemocle/crypto-cap-watcher" target="_new">Github</a></p>
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
      }
    }
  };
</script>

<style type="scss">
</style>
