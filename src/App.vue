<template>
  <v-app id="app" :dark="theme">
    <topbar></topbar>
    <main class="mb-5">
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
    <bottombar></bottombar>
  </v-app>
</template>

<script>
  import Topbar from '@/components/Topbar';
  import Bottombar from '@/components/Bottombar';

  let intervalChecker = null;

  export default {
    computed: {
      theme() {
        return this.$store.state.settings.theme;
      }
    },
    components: {
      Topbar,
      Bottombar
    },
    created() {
      if (!intervalChecker) {
        intervalChecker = window.setInterval(this.updateSecondsLeft, 1000);
      }
    },
    methods: {
      updateSecondsLeft() {
        // Run at interval a new request
        if (this.$store.state.history.secondsLeft <= 1) {
          return this.$store.dispatch('getdata');
        }

        return this.$store.dispatch('updateSecondsLeft');
      }
    }
  };
</script>

<style lang="scss">
  .dynamic-placeholder {
    transition: opacity 0.25s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    opacity: 1;;
  }

  .opa-a {
    opacity: 0;
  }
</style>

<style lang="stylus">
  @import '_variables'
  @import '~vuetify/src/stylus/main'
  @import '_modifier'

  html
    font-size: 10px

  @media $display-breakpoints.sm-and-up
    html
      font-size: 12px

  @media $display-breakpoints.md-and-up
    html
      font-size: 13px

  @media $display-breakpoints.lg-and-up
    html
      font-size: 14px

  @media $display-breakpoints.xl-only
    html
      font-size: 16px
</style>