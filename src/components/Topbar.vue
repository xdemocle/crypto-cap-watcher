<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
      clipped
      mobile-breakpoint="60000"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
            <v-list-item-subtitle>Crypto Cap Watcher</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="themeSwitch" color="purple" />
          </v-list-item-action>
          <v-list-item-title>{{ themeLabel }} theme</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="fullscreenSwitch" color="purple" />
          </v-list-item-action>
          <v-list-item-title> Fullscreen </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="showMillionsSwitch" color="purple" />
          </v-list-item-action>
          <v-list-item-title> Compact Millions </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="switchEthereum" color="purple" />
          </v-list-item-action>
          <v-list-item-title> Ethereum (ETH) </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="tetherSwitch" color="purple" />
          </v-list-item-action>
          <v-list-item-title> Tether (USDT) </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list class="py-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title">Changes</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-layout wrap align-center fluid style="max-width: 310px">
        <v-flex
          v-for="(card, index) in timingSorted"
          :key="index"
          xs6
          class="pl-3 pr-3 py-2 heading"
        >
          <v-switch
            :input-value="card.visible"
            color="green"
            :label="card.label"
            hide-details
            @click="toggleCardVisibility(card.id)"
          />
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar fixed>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            :loading="requestProgressHidden"
            v-on="on"
            @click="refreshData"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Last updated: {{ lastUpdate | moment('HH:mm \\G\\M\\TZ') }}</span>
      </v-tooltip>

      <v-spacer />

      <v-toolbar-title>
        <v-tooltip
          bottom
          max-width="30rem"
          min-width="30rem"
        >
          <template #activator="{ on, attrs }">
            <v-toolbar-title
              v-bind="attrs"
              slot="activator"
              class="headline ml-0"
              v-on="on"
              @click="drawer = !drawer"
            >
              <span class="hidden-xs-only">{{ siteName }}</span>
              <span class="hidden-sm-and-up">{{ siteShortName }}</span>
            </v-toolbar-title>
          </template>

          <span>
            {{ siteDescription }}
          </span>
        </v-tooltip>
      </v-toolbar-title>

      <v-spacer />

      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="drawer = !drawer"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <span>Open settings</span>
      </v-tooltip>
    </v-toolbar>

    <v-dialog v-model="throttlingDialog" max-width="30rem">
      <v-card>
        <v-card-title>
          <span class="title">Limit on requests</span>
        </v-card-title>
        <v-card-text>
          In order to not overload
          <a
            href="https://www.coinmarketcap.com"
            target="_new"
          >Coinmarketcap.com</a>
          services, we are limiting the number of refresh of data at
          <strong>{{ secondsThrottling }}</strong> seconds each.
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click.stop="throttlingDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="offlineDialog" max-width="30rem">
      <v-card>
        <v-card-title>
          <span class="title">Internet offline</span>
        </v-card-title>
        <v-card-text>
          Your internet connection if offline, please try again later.
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click.stop="offlineDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-progress-linear
      v-show="requestProgressHidden"
      height="1"
      :indeterminate="true"
      class="topbar-request-progress"
    />
  </div>
</template>

<script>
import _ from 'lodash'

const { chrome } = window

export default {
  name: 'Topbar',
  data: () => ({
    fadeToggle: false,
    throttlingDialog: false,
    offlineDialog: false,
    drawer: false
  }),
  computed: {
    switchEthereum: {
      get() {
        return this.$store.state.settings.ethereum
      },
      set() {
        if (this.castConnected) {
          this.$chromecast.Sender.sendMessage({
            context: 'commit',
            method: 'settings/ethereum'
          })
        }
        return this.$store.commit('settings/switchEthereum')
      }
    },
    themeSwitch: {
      get() {
        return this.$store.state.settings.theme
      },
      set() {
        if (this.castConnected) {
          this.$chromecast.Sender.sendMessage({
            context: 'commit',
            method: 'settings/switchTheme'
          })
        }

        return this.$store.commit('settings/switchTheme')
      }
    },
    themeLabel() {
      return this.$store.state.settings.theme ? 'Night' : 'Day'
    },
    siteName() {
      return this.$store.state.constants.name
    },
    siteShortName() {
      return this.$store.state.constants.shortName
    },
    siteDescription() {
      return this.$store.state.constants.description
    },
    fullscreenSwitch: {
      get() {
        return this.$store.state.settings.fullscreen
      },
      set() {
        if (this.$store.state.settings.fullscreen) {
          this.$fullscreen.exit()
        } else {
          this.$fullscreen.enter()
        }

        return this.$store.commit('settings/switchFullscreen')
      }
    },
    showMillionsSwitch: {
      get() {
        return this.$store.state.settings.showMillions
      },
      set() {
        if (this.castConnected) {
          this.$chromecast.Sender.sendMessage({
            context: 'commit',
            method: 'settings/switchShowMillions'
          })
        }

        return this.$store.commit('settings/switchShowMillions')
      }
    },
    tetherSwitch: {
      get() {
        return this.$store.state.settings.tether
      },
      set() {
        if (this.castConnected) {
          this.$chromecast.Sender.sendMessage({
            context: 'commit',
            method: 'settings/switchTether'
          })
        }

        return this.$store.commit('settings/switchTether')
      }
    },
    requestProgressHidden() {
      return this.$store.state.history.requestBusy
    },
    lastUpdate() {
      return this.$store.state.history.last_updated || Date.now()
    },
    secondsThrottling() {
      return this.$store.state.constants.secondsThrottling
    },
    timingSorted() {
      if (!this.$store.state.settings.config) {
        return null
      }
      return _.orderBy(this.$store.state.settings.config.timing, 'id')
    },
    castConnected() {
      return this.$store.state.status.casting
    },
    isChromecast() {
      return this.$store.state.status.isChromecast
    },
    castButtonVisibility() {
      return this.$store.state.status.castButtonVisibility
    }
  },
  created() {
    // Check if the browser isn't Chrome and deactivate the ChromeCast icon
    if (!chrome) {
      this.$store.dispatch('updateCastButtonVisibilityState', false)
    }
  },
  methods: {
    refreshData() {
      if (!this.$store.state.status.online) {
        this.offlineDialog = true
        return
      }

      this.$store.dispatch('history/getdata').then((response) => {
        this.throttlingDialog = response === 'throttling' || false
      })
    },
    toggleCardVisibility(id) {
      this.$store.dispatch('settings/updateConfigTiming', { id }).then(() => {

      })
    }
  }
}
</script>

<style lang="scss">
.topbar-request-progress {
  position: absolute !important;
  bottom: 0;
  margin: 0 !important;
}

.tooltip-container--refresh,
.tooltip-container--title,
.menu-container--dropdown {
  position: relative;
  margin-left: 0 !important;
}

.tooltip-content--refresh {
  top: 100% !important;
  left: 1rem !important;
}

.tooltip-content--title {
  top: 100% !important;
  left: 50% !important;
  margin-left: -12.5rem;
  min-width: 25rem;
}

.menu-container--dropdown .menu__content {
  top: 100% !important;
  right: 5% !important;
  left: auto !important;
}
</style>
