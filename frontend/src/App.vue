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

  import MenuComp from './components/MenuComp.vue';
  import FooterComp from './components/FooterComp';

  import user from './services/user.js';
  import session from './services/session.js';
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
        if (this.loggedIn) return user.get(this.userId);
      },
      userId: function() {
        return session.getUser(localStorage.session);
      },
      loggedIn: function() {
        return this.userId !== 0 && this.userId !== null;
      },
      showLogin: function() {
        return this.userId === 0;
      }
    },
    router
  }
</script>