<template>
  <v-container fluid text-xs-center class="dashboard__container">
    <v-layout
      row
      wrap
      fill-height
      fluid
      class="dashboard__header">

      <v-flex d-flex-auto-width content-vertical-center px-1 py-1>
        <v-card class="py-2">
          <v-card-text class="text-xs-center py-2">
            <v-icon x-large>monetization_on</v-icon>
          </v-card-text>
          <v-card-text class="py-2">
            <div class="display-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{currencyDisplay(totalMarketCap)}}</div>
          </v-card-text>
          <v-card-text class="py-2">
            <div class="title ellipsis" title="Global Market Capitalization">Global Market Capitalization</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex-auto-width content-vertical-center px-1 py-1>
        <v-card class="py-2">
          <v-card-text class="text-xs-center py-2">
            <v-icon x-large>timelapse</v-icon>
          </v-card-text>
          <v-card-text class="py-2">
            <div class="display-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{currencyDisplay(total24hVol)}}</div>
          </v-card-text>
          <v-card-text class="py-2">
            <div class="title ellipsis" title="24h Global Market Volume">24h Global Market Volume</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex-auto-width content-vertical-center px-1 py-1>
        <v-card class="py-2">
          <v-card-text class="py-2">
            <div class="display-1 mb-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{bitcoinPercentage}}</div>
            <div class="title ellipsis" title="Bitcoin Dominance">Bitcoin Dominance</div>
          </v-card-text>
          <v-card-text class="py-2" v-if="tickers.BTC">
            <div class="flex mb-2">
              <span class="display-2" v-bind:class="priceClass('BTC')">{{tickers.BTC.PRICE | currency('$', ',', 2, '.', 'front', false)}}</span>
              <v-tooltip top class="d-inline-block">
                <div class="flex align-center ml-2" slot="activator" :class="{'green--text': priceArrow24Hour('BTC') == 'up', 'red--text': priceArrow24Hour('BTC') == 'down'}">
                  <v-icon class="text-xs-center" style="line-height: 0.5rem;font-size: 3.5rem;width: 2rem;" :color="priceArrow24Hour('BTC') == 'up' ? 'green' : 'red'">arrow_drop_{{priceArrow24Hour('BTC')}}</v-icon>
                  <span class="d-flex">{{tickers.BTC.CHANGE24HOURPCT}}%</span>
                </div>
                <span>24 Hours Price difference</span>
              </v-tooltip>
            </div>
            <v-tooltip bottom>
              <span slot="activator" class="title ellipsis">Bitcoin Price</span>
              <span>Real-time price from Cryptocompare.com</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex-auto-width content-vertical-center px-1 py-1 v-show="showEthereum">
        <v-card class="py-2">
          <v-card-text class="py-2">
            <div class="display-1 mb-2 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{ethereumPercentage}}</div>
            <div class="title ellipsis" title="Bitcoin Dominance">Ethereum Dominance</div>
          </v-card-text>
          <v-card-text class="py-2" v-if="tickers.ETH">
            <div class="flex mb-2">
              <span class="display-2" v-bind:class="priceClass('ETH')">{{tickers.ETH.PRICE | currency('$', ',', 2, '.', 'front', false)}}</span>
              <v-tooltip top class="d-inline-block">
                <div class="flex align-center ml-2" slot="activator" :class="{'green--text': priceArrow24Hour('ETH') == 'up', 'red--text': priceArrow24Hour('ETH') == 'down'}">
                  <v-icon class="text-xs-center" style="line-height: 0.5rem;font-size: 3.5rem;width: 2rem;" :color="priceArrow24Hour('ETH') == 'up' ? 'green' : 'red'">arrow_drop_{{priceArrow24Hour('ETH')}}</v-icon>
                  <span class="d-flex">{{tickers.ETH.CHANGE24HOURPCT}}%</span>
                </div>
                <span>24 Hours Price difference</span>
              </v-tooltip>
            </div>
            <v-tooltip bottom>
              <span slot="activator" class="title ellipsis">Ethereum Price</span>
              <span>Real-time price from Cryptocompare.com</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex-auto-width content-vertical-center px-1 py-1 v-show="showTether">
        <v-card class="py-2" v-if="tickers.USDT">
          <v-card-text class="py-2">
            <div class="display-1 mb-3 dynamic-placeholder" v-bind:class="{'opa-a': fadeToggle}">{{currencyDisplay(tickers.USDT['24h_volume_usd'])}}</div>
            <div class="title ellipsis">24h Tether Volume</div>
          </v-card-text>
          <v-card-text class="py-2">
            <div class="flex mb-2">
              <span class="display-2" v-bind:class="priceClass('USDT')">{{tickers.USDT.price_usd | currency('$', ',', 4, '.', 'front', false)}}</span>
              <v-tooltip top class="d-inline-block">
                <div class="flex align-center ml-2" slot="activator" :class="{'green--text': priceArrow24Hour('USDT') == 'up', 'red--text': priceArrow24Hour('USDT') == 'down'}">
                  <v-icon class="text-xs-center" style="line-height: 0.5rem;font-size: 3.5rem;width: 2rem;" :color="priceArrow24Hour('USDT') == 'up' ? 'green' : 'red'">arrow_drop_{{priceArrow24Hour('USDT')}}</v-icon>
                  <span class="d-flex">{{tickers.USDT.percent_change_24h}}%</span>
                </div>
                <span>24 Hours Price difference</span>
              </v-tooltip>
            </div>
            <v-tooltip bottom>
              <span slot="activator" class="title ellipsis">USDT Price</span>
              <span>Price from Coinmarketcap.com</span>
            </v-tooltip>

          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
    <v-layout
      row
      wrap
      fill-height
      fluid
      class="dashboard__body">

      <v-scale-transition>
        <v-flex xs12 sm3 md3 px-1 py-1 v-show="showCardsHint">
          <v-card class="py-2">
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
        <v-flex d-flex-auto-width xs6 sm4 md3 px-1 py-1 v-show="cardVisibility(card.id)">
          <v-card class="py-2" width="100%">
            <v-btn fab icon absolute small right @click.native="toggleCardVisibility(card.id)" class="hidden-md-and-down hidden-if-chromecast">
              <v-icon>close</v-icon>
            </v-btn>
            <v-card-text>
              <div class="mb-3">
                <div class="headline mb-1">
                  {{currencyDisplay(card.total_market_cap)}}<v-icon
                    :color="getColor(card.total_market_cap_arrow)">arrow_{{card.total_market_cap_arrow}}ward</v-icon
                  ><span class="subheading" :class="getClass(card.total_market_cap_arrow)">{{card.total_market_cap_perc}}%</span>
                </div>
                Global Market Cap
              </div>
              <div class="mb-3">
                <div class="headline mb-1">
                  {{currencyDisplay(card.total_24h_volume)}}<v-icon
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
                <div class="title ellipsis">Changes {{getCardLabel(card.id)}}</div>
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
  import { TweenMax, Power2 } from 'gsap/TweenMax';
  /* eslint no-unused-vars: 0 */
  import ScrollToPlugin from 'gsap/ScrollToPlugin';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Dashboard',
    data: () => ({
      fadeToggle: false
    }),
    computed: {
      settings() {
        return this.$store.state.settings;
      },
      ...mapGetters({
        totalMarketCap: 'total_market_cap',
        bitcoinPercentage: 'bitcoin_percentage',
        ethereumPercentage: 'ethereum_percentage',
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

        return this.$store.state.history.last_updated || Date.now();
      },
      showCardsHint() {
        if (!this.$store.state.settings.config || !this.$store.state.settings.config.timing) {
          return false;
        }
        return !_.find(this.$store.state.settings.config.timing, { visible: true });
      },
      showTether() {
        return this.$store.state.settings.tether;
      },
      showEthereum() {
        return this.$store.state.settings.ethereum;
      },
      tickers() {
        return this.$store.state.tickers.updates;
      },
      isChromecast() {
        return this.$store.state.status.isChromecast;
      }
    },
    methods: {
      currencyDisplay(value) {
        const val = Number(value);

        if (this.$store.state.settings.showMillions) {
          return [this.$options.filters.currency(val / 1000000), 'MM'].join('');
        }

        return this.$options.filters.currency(val);
      },
      toggleCardVisibility(id) {
        this.$store.dispatch('settings/updateConfigTiming', { id }).then(() => {
          // We send a sync command to the chromecast receiver
          if (this.castConnected) {
            const timing = _.find(this.$store.state.settings.config.timing, { id });
            const status = timing.visible || false;

            this.$chromecast.Sender.sendMessage({
              method: 'settings/updateConfigTiming',
              payload: { id, status }
            });
          }
        });
      },
      getColor(direction) {
        return direction === 'down' ? 'red' : 'green';
      },
      getClass(direction) {
        return direction === 'down' ? 'red--text' : 'green--text';
      },
      getCard(id) {
        if (!this.$store.state.settings.config || !this.$store.state.settings.config.timing) {
          return false;
        }

        return _.find(this.$store.state.settings.config.timing, { id });
      },
      cardVisibility(id) {
        const item = this.getCard(id);

        if (!item) {
          return false;
        }

        return item.visible;
      },
      getCardLabel(id) {
        const item = this.getCard(id);

        if (!item) {
          return false;
        }
        return item.label;
      },
      priceClass(symbol) {
        let flag = 4;

        const coin = this.$store.state.tickers.updates[symbol];

        if (coin && coin.FLAGS) {
          flag = Number(coin.FLAGS);
        } else if (coin && coin.percent_change_24h) {
          flag = coin.percent_change_24h < 0 ? 2 : 4;
        }

        return {
          'green--text': flag === 1 || flag === 4,
          'red--text': flag === 2
        };
      },
      priceArrow24Hour(symbol) {
        const coin = this.$store.state.tickers.updates[symbol];

        if (!coin || (!coin.CHANGE24HOURPCT && !coin.percent_change_24h)) {
          return 'up';
        }

        return (coin.CHANGE24HOURPCT || coin.percent_change_24h) < 0 ? 'down' : 'up';
      }
    },
    mounted() {
      if (this.isChromecast) {
        setTimeout(() => {
          TweenMax.to('.dashboard__body', 7, {
            scrollTo: { y: 'max' },
            repeat: -1,
            yoyo: true,
            ease: Power2.easeInOut
          });
        }, 3000);
      }
    }
  };
</script>
