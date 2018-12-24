<template>
  <v-app dark>
    <MenuComp
      v-bind:userId="userId"></MenuComp>
    <v-content>
      <MainPage v-if="loggedIn"></MainPage>
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
      userId: function() {
        return session.getUser(localStorage.session);
      },
      loggedIn: function() {
        return this.userId !== 0;
      }
    },
    router
  }
</script>