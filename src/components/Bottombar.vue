<template>
  <v-footer app inset fixed class="py-5 px-4">
    <v-layout row wrap align-center justify-space-between>
      <v-flex xs9 sm6 class="text-xs-left">
        <p class="mb-0 text-muted">
          <v-icon
            :color="connectionOffline ? 'red' : ''"
            class="mr-1"
          >
            mdi-wifi
          </v-icon>
          <span v-if="connectionOffline">Internet disconnected</span>
          <span
            v-if="!connectionOffline"
          >Interface updates in
            <span class="green--text">{{ counterSeconds }}</span> seconds</span>
        </p>
      </v-flex>
      <v-flex sm6 class="hidden-xs-only text-xs-center text-sm-right ellipsis">
        <p class="mb-0 text-muted" style="position: relative">
          Data served by
          <a
            href="https://coinmarketcap.com"
            target="_new"
            title="coinmarketcap.com"
          >CMC</a>
          and
          <a
            href="https://cryptocompare.com"
            target="_new"
            title="cryptocompare.com"
          >CC</a>
          -
          <a
            href="https://github.com/xdemocle/crypto-cap-watcher"
            target="_new"
            class="text-decoration-none"
          >Crypto Cap Watcher</a>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <a
                href="https://github.com/xdemocle/crypto-cap-watcher/issues"
                target="_new"
                class="text-decoration-none"
                v-bind="attrs"
                v-on="on"
                ><v-icon class="ml-1 hidden-xs-only">mdi-help</v-icon></a>
            </template>
            <span>Open a support ticket or send a bug on Github</span>
          </v-tooltip>
        </p>
      </v-flex>
      <v-flex xs3 class="hidden-sm-and-up text-xs-right ellipsis">
        <v-btn
          text
          icon
          small
          class="my-0 mx-0"
          @click="disclaimerDialog = true"
        >
          <v-icon>mdi-help</v-icon>
        </v-btn>
        <v-dialog v-model="disclaimerDialog" max-width="30rem">
          <v-card>
            <v-card-title>
              <span class="title">Disclaimer</span>
            </v-card-title>
            <v-card-text>
              <p>
                Data served by
                <a
                  href="https://coinmarketcap.com"
                  target="_new"
                >coinmarketcap.com</a><br>
                Live price Bitcoin served by
                <a
                  href="https://cryptocompare.com"
                  target="_new"
                >cryptocompare.com</a><br>
                Hosted on
                <a
                  href="https://github.com/xdemocle/crypto-cap-watcher"
                  target="_new"
                >Github</a><br>
                <br>
                Open a support ticket or send a bug on
                <a
                  href="https://github.com/xdemocle/crypto-cap-watcher/issues"
                  target="_new"
                >Github</a>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click.stop="disclaimerDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'Bottombar',
  data: () => ({
    disclaimerDialog: false
  }),
  computed: {
    counterSeconds() {
      return this.$store.state.history.secondsLeft
    },
    connectionOffline: {
      get() {
        return !this.$store.state.status.online
      },
      set() {
        return null
      }
    }
  }
}
</script>
