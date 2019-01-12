<template>
  <v-app
    :dark="true">
    <MenuComp
      v-bind:user="user">
    </MenuComp>
    <v-content>
      <MainPage
              v-if="!showLogin"
              v-bind:user="user"
      ></MainPage>
      <LoginRegisterPage v-else></LoginRegisterPage>
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

  import user from './services/user.js';
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
    asyncComputed: {
      user: function() {
        return user.get(localStorage.session);
      },
      showLogin: function() {
        return this.user === undefined;
      }
    },
    router
  }
</script>