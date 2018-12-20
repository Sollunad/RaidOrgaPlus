<template>
  <v-app dark>
    <MenuComp></MenuComp>
    <v-content>
      <router-view></router-view>
    </v-content>
    <FooterComp></FooterComp>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  import MenuComp from './components/MenuComp.vue';
  import FooterComp from './components/FooterComp';

  import DashboardPage from './pages/DashboardPage.vue';


  const routes = [
      { path: '/dashboard', component: DashboardPage }
  ];

  const router = new VueRouter({routes});
  Vue.use(VueRouter);
  export default {
    components: {
      FooterComp,
      MenuComp,
    },
    props: {
      source: String
    },
    router
  }
</script>