<template>
  <v-container fluid text-xs-center>
    <v-layout
      row
      wrap
      align-center
      fluid>

      <v-flex xs12 sm6 md4 px-2 py-2>
        <v-card class="py-3">
          <v-card-text class="text-xs-center">
            <v-icon x-large>monetization_on</v-icon>
          </v-card-text>
          <v-card-text>
            <div class="display-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{totalMarketCap | currency}}</div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Global Market Capitalization</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 px-2 py-2>
        <v-card class="py-3">
          <v-card-text class="text-xs-center">
            <v-icon x-large>pie_chart_outlined</v-icon>
          </v-card-text>
          <v-card-text>
            <div class="display-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{bitcoinPercentage}}</div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Bitcoin Dominance</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md4 px-2 py-2>
        <v-card class="py-3">
          <v-card-text class="text-xs-center">
            <v-icon x-large>timelapse</v-icon>
          </v-card-text>
          <v-card-text>
            <div class="display-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{total24hVol | currency}}</div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">24h Global Market Volume</div>
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

      <v-scale-transition v-for="(card, index) in history" v-bind:key="index">
        <v-flex xs6 sm3 md3 px-2 py-2 v-show="cardVisibility(card.id)">
          <v-card class="py-3">
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
      getColor(arrow) {
        return arrow === 'down' ? 'red' : 'green';
      },
      getClass(arrow) {
        return arrow === 'down' ? 'red--text' : 'green--text';
      },
      getLabel(id) {
        return _.find(store.state.settings.config.timing, { id }).label;
      }
    }
  };
</script>
