// initial states
const state = {
  name: 'Crypto Cap Watcher',
  shortName: 'CCW',
  description:
    'Crypto Cap Watcher is a web tool for monitoring the crypto currencies global market capitalization, daily aggregated global volume of exchangers and bitcoin dominance over the market.',
  secondsThrottling: 30,
  apiUrl: '/api',
  wsCccSubscriptions: ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'],
  apiUrlCoinmarketcap: 'https://api.coinmarketcap.com/v1/ticker',
  wsLivetimePricesUrl: 'https://streamer.cryptocompare.com'
}

export default {
  state
}
