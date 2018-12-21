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
  import VueAsync from 'vue-async-computed';

  import MenuComp from './components/MenuComp.vue';
  import FooterComp from './components/FooterComp';

  import MeineRaidsPage from './pages/MeineRaidsPage.vue';
  import RaidDashboardPage from "./pages/RaidDashboardPage";
  import TerminePage from "./pages/TerminePage";
  import AufstellungPage from "./pages/AufstellungPage";
  import ArchivPage from "./pages/ArchivPage";
  import ProfilPage from "./pages/ProfilPage";
  import SkillsPage from "./pages/SkillsPage";
  import EinstellungenPage from "./pages/EinstellungenPage";


  const routes = [
      { path: '/raids', component: MeineRaidsPage },
      { path: '/raid', component: RaidDashboardPage },
      { path: '/termine', component: TerminePage },
      { path: '/aufstellung', component: AufstellungPage },
      { path: '/archiv', component: ArchivPage },
      { path: '/profil', component: ProfilPage },
      { path: '/skills', component: SkillsPage },
      { path: '/einstellungen', component: EinstellungenPage }
  ];

  const router = new VueRouter({routes});
  Vue.use(VueRouter);
  Vue.use(VueAsync);
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