<template>
  <v-app
    class="unselectable"
    v-resize="onResize">
    <MenuComp
      v-bind:show="showContent && !withoutLoginAllowed">
    </MenuComp>
    <v-content>
        <MainPage
                v-if="showContent"
                v-on:changeName="changeName"
                v-bind:user="user"
                v-bind:width="width">
        </MainPage>
        <LoginRegisterPage
          v-else-if="showLogin">
        </LoginRegisterPage>
        <div class="spinner" v-else>
            <v-progress-circular
                    indeterminate
                    color="primary"
            ></v-progress-circular>
        </div>
    </v-content>
    <FooterComp></FooterComp>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  import MenuComp from './components/menu/MenuComp.vue';
  import FooterComp from './components/menu/FooterComp';

  import MainPage from "./pages/MainPage";
  import LoginRegisterPage from "./pages/LoginRegisterPage";

  import routes from './routes.js';

  const router = new VueRouter({routes});
  Vue.use(VueRouter);

  export default {
      components: {
        LoginRegisterPage,
        MainPage,
        FooterComp,
        MenuComp,
      },
      props: {
        source: String
      },
      data: () => ({
        user: {},
        withoutLoginAllowed: false,
        allowedRoutes: ['preview', 'reset'],
        width: 0
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
          changeName: async function(name) {
              this.user.name = name;
          },
          onResize: function() {
              this.$store.dispatch('saveWindowWidth');
          },
          guardRoute: function() {
              this.withoutLoginAllowed = this.allowedRoutes.includes(router.currentRoute.path.split('/')[1]);
          }
      },
      created: async function() {
          this.guardRoute();
          await this.$store.dispatch('getLoggedInUser');
          this.user = this.$store.getters.loggedInUser;

          if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('service-worker.js');
          }
      },
      mounted: function() {
          this.onResize();
      },
      watch: {
          $route: function() {
              this.guardRoute();
          }
      },
      router
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