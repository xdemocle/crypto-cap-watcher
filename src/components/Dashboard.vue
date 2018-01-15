<template>
  <v-container fluid text-xs-center>
    <v-layout
      row
      wrap
      fill-height
      fluid>

      <v-flex d-flex xs12 sm6 md4 px-2 py-2>
        <v-card class="py-3">
          <v-card-text class="text-xs-center">
            <v-icon x-large>monetization_on</v-icon>
          </v-card-text>
          <v-card-text>
            <div class="display-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{totalMarketCap | currency}}</div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis" title="Global Market Capitalization">Global Market Capitalization</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4 px-2 py-2>
        <v-card class="py-3">
          <!-- <v-card-text class="text-xs-center">
            <v-icon x-large>pie_chart_outlined</v-icon>
          </v-card-text> -->
          <v-card-text class="py-1">
            <div class="display-1 mb-3 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{bitcoinPercentage}}</div>
            <div class="title ellipsis" title="Bitcoin Dominance">Bitcoin Dominance</div>
          </v-card-text>
          <v-card-text>
            <div class="flex">
              <span class="display-3" v-bind:class="bitcoinPriceClass">{{bitcoinPrice.PRICE | currency('$', ',', 2, '.', 'front', false)}}</span>
              <v-tooltip top class="d-inline-block">
                <div class="flex align-center green--text ml-2" slot="activator" :class="{'green--text': bitcoinPriceArrow24Hour == 'up', 'red--text': bitcoinPriceArrow24Hour == 'down'}">
                  <v-icon class="text-xs-center" style="line-height: 1rem;font-size: 5rem;width: 2rem;" :color="bitcoinPriceArrow24Hour == 'up' ? 'green' : 'red'">arrow_drop_{{bitcoinPriceArrow24Hour}}</v-icon>
                  <span class="d-flex title">{{bitcoinPrice.CHANGE24HOURPCT}}%</span>
                </div>
                <span>24 Hours Price difference</span>
              </v-tooltip>
            </div>
            <div class="title ellipsis" title="Bitcoin Dominance">Bitcoin Price Real-time</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm12 md4 px-2 py-2>
        <v-card class="py-3">
          <v-card-text class="text-xs-center">
            <v-icon x-large>timelapse</v-icon>
          </v-card-text>
          <v-card-text>
            <div class="display-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{total24hVol | currency}}</div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis" title="24h Global Market Volume">24h Global Market Volume</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-scale-transition>
        <v-flex xs12 sm6 md4 px-2 py-2 v-show="showCardsHint">
          <v-card class="py-3">
            <v-card-text>
              <div class="title">Restore Cards</div>
            </v-card-text>
            <v-card-text>
              <v-btn fab>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-text>
            <v-card-text>
              To restore one or more statistic, click the symbol showed above present on top right of the screen.
            </v-card-text>
          </v-card>
        </v-flex>
      </v-scale-transition>

      <v-scale-transition v-for="(card, index) in historySorted" v-bind:key="index">
        <v-flex xs6 sm3 md3 px-2 py-2 v-show="cardVisibility(card.id)" style="display: flex;">
          <v-card class="py-3" width="100%">
            <v-btn fab icon absolute small right @click.native="toggleCardVisibility(card.id)" class="hidden-md-and-down">
              <v-icon>close</v-icon>
            </v-btn>
            <v-card-text>
              <div class="mb-3">
                <div class="headline mb-1">
                  {{card.total_market_cap | currency}}<v-icon
                    :color="getColor(card.total_market_cap_arrow)">arrow_{{card.total_market_cap_arrow}}ward</v-icon
                  ><span class="subheading" :class="getClass(card.total_market_cap_arrow)">{{card.total_market_cap_perc}}%</span>
                </div>
                Global Market Cap
              </div>
              <div class="mb-3">
                <div class="headline mb-1">
                  {{card.total_24h_volume | currency}}<v-icon
                    :color="getColor(card.total_24h_volume_arrow)">arrow_{{card.total_24h_volume_arrow}}ward</v-icon
                  ><span class="subheading" :class="getClass(card.total_24h_volume_arrow)">{{card.total_24h_volume_perc}}%</span>
                </div>
                24h Global Market Volume
              </div>
              <div class="mb-3">
                <div class="headline mb-1">
                  {{card.bitcoin_percentage}}%<v-icon
                    :color="getColor(card.bitcoin_percentage_arrow)">arrow_{{card.bitcoin_percentage_arrow}}ward</v-icon
                  ><span class="subheading" :class="getClass(card.bitcoin_percentage_arrow)">{{card.bitcoin_percentage_perc}}%</span>
                </div>
                Bitcoin Dominance
              </div>
              <div class="pt-1 pb-0 mb-0">
                <div class="title ellipsis">{{getLabel(card.id)}}</div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-scale-transition>

    </v-layout>
    <span style="display: none;">{{lastUpdate}}</span>
  </v-container>
</template>

<script>
  import _ from 'lodash';
  import { mapGetters } from 'vuex';
  import store from '../store';

  export default {
    name: 'Dashboard',
    data: () => ({
      fadeToggle: false
    }),
    computed: {
      ...mapGetters({
        totalMarketCap: 'total_market_cap',
        bitcoinPercentage: 'bitcoin_percentage',
        total24hVol: 'total_24h_volume',
        history: 'history'
      }),
      historySorted() {
        return _.orderBy(this.history, 'id');
      },
      lastUpdate() {
        const that = this;
        this.fadeToggle = true;

        setTimeout(() => {
          that.fadeToggle = false;
        }, 300);

        return store.state.history.last_updated;
      },
      showCardsHint() {
        if (!store.state.settings.config || !store.state.settings.config.timing) {
          return false;
        }
        return !_.find(store.state.settings.config.timing, { visible: true });
      },
      bitcoinPrice() {
        return store.state.tickers.updates;
      },
      bitcoinPriceClass() {
        const flag = Number(this.bitcoinPrice.FLAGS);
        return {
          'green--text': flag === 1 || flag === 4,
          'red--text': flag === 2
        };
      },
      bitcoinPriceArrow24Hour() {
        return this.bitcoinPrice.CHANGE24HOURPCT > 0 ? 'up' : 'down';
      }
    },
    methods: {
      cardVisibility(id) {
        if (!store.state.settings.config || !store.state.settings.config.timing) {
          return true;
        }
        return _.find(store.state.settings.config.timing, { id }).visible;
      },
      toggleCardVisibility(id) {
        this.$store.dispatch('updateConfigTiming', id);
      },
      getColor(direction) {
        return direction === 'down' ? 'red' : 'green';
      },
      getClass(direction) {
        return direction === 'down' ? 'red--text' : 'green--text';
      },
      getLabel(id) {
        return _.find(store.state.settings.config.timing, { id }).label;
      }
    }
  };
</script>
