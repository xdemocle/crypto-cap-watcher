<template>
  <v-container fluid text-xs-center>
    <v-layout
      row
      wrap
      class="my-5"
      align-center
      fluid>
      <v-flex xs12 md4>
        <div class="display-2 text-xs-center">{{totalMarketCap}}</div>
        <div class="subheadline text-xs-center">Market Capitalization</div>
      </v-flex>
      <v-flex xs12 md4>
        <div class="display-2">{{bitcoinPercentage}}</div>
        <div class="subheadline">Bitcoin Dominance</div>
      </v-flex>
      <v-flex xs12 md4>
        <div class="display-2 text-xs-center">{{total24hVol}}</div>
        <div class="subheadline text-xs-center">24h Market Volume</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // import store from '../store';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters({
        totalMarketCap: 'total_market_cap',
        bitcoinPercentage: 'bitcoin_percentage_of_market_cap',
        total24hVol: 'total_24h_volume'
      })
    }
  };
</script>

<style>

</style>
