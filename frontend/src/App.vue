<template>
  <v-app
    :dark="true"
    class="unselectable">
    <MenuComp
      v-bind:user="user"
      v-bind:show="showContent && !withoutLoginAllowed">
    </MenuComp>
    <v-content>
        <MainPage
                v-if="showContent"
                v-on:changeName="changeName"
                v-bind:user="user">
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
  import VueAsync from 'vue-async-computed';

  import MenuComp from './components/menu/MenuComp.vue';
  import FooterComp from './components/menu/FooterComp';

  import _users from './services/endpoints/users';
  import MainPage from "./pages/MainPage";
  import LoginRegisterPage from "./pages/LoginRegisterPage";

  import routes from './routes.js';

  const router = new VueRouter({routes});
  Vue.use(VueRouter);
  Vue.use(VueAsync);

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
      showLogin: false,
      withoutLoginAllowed: false,
      allowedRoutes: ['preview', 'reset']
    }),
    computed: {
        showContent: function() {
          const isLoggedIn = Object.keys(this.user).length > 0;
          return this.withoutLoginAllowed || isLoggedIn;
        }
    },
    methods: {
        changeName: async function(name) {
            this.user.name = name;
        }
    },
    created: async function() {
        const user = await _users.get();
        if (user) this.user = user;
        else this.showLogin = true;
        this.withoutLoginAllowed = this.allowedRoutes.includes(router.currentRoute.path.split('/')[1]);

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js');
        }
    },
    watch: {
        $route: function() {
            this.withoutLoginAllowed = this.allowedRoutes.includes(router.currentRoute.path.split('/')[1]);
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