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
      <v-flex xs12 sm6 md4 px-2 py-2>
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

      <v-flex xs6 sm3 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (5 Minutes)</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (15 Minutes)</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (30 Minutes)</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (1 Hour)</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (3 Hours)</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 sm3 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (6 Hours)</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 sm6 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (12 Hours)</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs6 sm6 md3 px-2 py-2>
        <v-card class="py-3">
          <v-card-text>
            <div class="mb-3">
              <div class="headline mb-1">
                {{1 | currency}}<v-icon color="red">arrow_downward</v-icon>
              </div>
              Global Market Cap
            </div>
            <div class="mb-0">
              <div class="headline mb-1">
                {{35}}%<v-icon color="green">arrow_upward</v-icon>
              </div>
              Bitcoin Dominance
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title ellipsis">Change (24 Hours)</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <span class="hide">{{lastUpdate}}</span>
  </v-container>
</template>

<script>
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
        bitcoinPercentage: 'bitcoin_percentage_of_market_cap',
        total24hVol: 'total_24h_volume'
      }),
      lastUpdate() {
        const that = this;
        this.fadeToggle = true;
        setTimeout(() => {
          that.fadeToggle = false;
        }, 300);

        // return this.$store.state.history.last_update;
        return store.state.history.last_updated;
      }
    }
  };
</script>
