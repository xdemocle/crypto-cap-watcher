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
  import constants from '@/store/modules/constants';
  import Topbar from '@/components/Topbar';
  import Bottombar from '@/components/Bottombar';

  export default {
    // data: () => ({
    //   items: [
    //     { title: 'Home', icon: 'dashboard' },
    //     { title: 'About', icon: 'question_answer' }
    //   ]
    // }),
    // props: {
    //   source: String
    // },
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
      const that = this;

      // First data retrieve
      this.getdata().then(() => {
        // Run at interval a new request
        window.setInterval(that.getdata, constants.state.checkEachMinutes * 60 * 1000);
        window.setInterval(that.updateSecondsLeft, 1000);
      });
    },
    methods: {
      // updateClock() {
      //   return this.$store.dispatch('updateClock');
      // },
      updateSecondsLeft() {
        return this.$store.dispatch('updateSecondsLeft');
      },
      getdata() {
        return this.$store.dispatch('getdata');
      }
    }
    // mounted() {
    //   this.updateClock();
    //   window.setInterval(this.updateClock, 1000);
    // }
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