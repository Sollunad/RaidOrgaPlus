<template>
  <v-app class="unselectable" v-resize="onResize">
    <MenuComp :show="showContent && !withoutLoginAllowed" />
    <v-content>
        <MainPage v-if="showContent" />
        <LoginRegisterPage v-else-if="showLogin" />
        <div class="spinner" v-else>
            <v-progress-circular indeterminate color="primary" />
        </div>
    </v-content>
  </v-app>
</template>

<script>
    import MenuComp from './components/menu/MenuComp.vue';

    import MainPage from "./pages/MainPage";
    import LoginRegisterPage from "./pages/LoginRegisterPage";

    export default {
      components: {
        LoginRegisterPage,
        MainPage,
        MenuComp,
      },
      props: {
        source: String
      },
      data: () => ({
        withoutLoginAllowed: false,
        allowedRoutes: ['preview', 'reset'],
      }),
      computed: {
          showContent: function() {
              return this.withoutLoginAllowed || this.$store.getters.loginSuccess;
          },
          showLogin: function() {
              return this.$store.getters.loginFailed;
          }
      },
      methods: {
          onResize: function() {
              this.$store.dispatch('saveWindowWidth');
          },
          guardRoute: function() {
              this.withoutLoginAllowed = this.allowedRoutes.includes(this.$router.currentRoute.path.split('/')[1]);
          }
      },
      created: async function() {
          this.guardRoute();
          await this.$store.dispatch('checkBuild');
          await this.$store.dispatch('getLoggedInUser');

          if ('serviceWorker' in navigator) {
              await navigator.serviceWorker.register('service-worker.js');
          }
      },
      mounted: function() {
          this.onResize();
      },
      watch: {
          $route: function() {
              this.guardRoute();
          }
      }
  }
</script>

<style scoped>
    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>