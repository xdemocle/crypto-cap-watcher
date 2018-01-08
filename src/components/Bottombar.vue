<template>
  <v-footer inset fixed class="pa-3">
    <v-layout row wrap align-center justify-space-between>
      <v-flex xs6>
        <p class="mb-0 pt-1 pb-1 text-muted">Data served by <a href="https://coinmarketcap.com" target="_blank">coinmarketcap.com</a> - History is saved in your browser's</p>
      </v-flex>
      <v-flex xs6>
        <div class="white--text mr-2 text-xs-right">
          <p class="mb-0 pt-1 pb-1 text-muted">Interface will be updated in {{counterSeconds}} seconds</p>
        </div>
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
