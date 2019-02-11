<template>
  <v-app
    :dark="true"
    class="unselectable">
    <MenuComp
      v-bind:user="user"
      v-bind:show="showContent && !isPreview">
    </MenuComp>
    <v-content>
        <MainPage
                v-if="showContent"
                v-on:changeName="changeName"
                v-bind:user="user"
                v-bind:isPreview="isPreview">
        </MainPage>
        <LoginRegisterPage
          v-else-if="showLogin">
        </LoginRegisterPage>
        <v-progress-circular
                v-else
                indeterminate
                color="primary"
        ></v-progress-circular>
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
      showLogin: false
    }),
    computed: {
        showContent: function() {
          const isLoggedIn = Object.keys(this.user).length > 0;
          return this.isPreview || isLoggedIn;
        },
        isPreview: function() {
            return router.currentRoute.path.split('/')[1] === 'preview';
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
    },
    router
  }
</script>

<style>
    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }
</style>