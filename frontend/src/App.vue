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
      { path: '/raids/:raid_id', component: RaidDashboardPage },
      { path: '/raids/:raid_id/termine', component: TerminePage },
      { path: '/raids/:raid_id/termine/:termin_id', component: AufstellungPage },
      { path: '/raids/:raid_id/archiv', component: ArchivPage },
      { path: '/raids/:raid_id/archiv/:termin_id', component: AufstellungPage },
      { path: '/profil', component: ProfilPage },
      { path: '/skills', component: SkillsPage },
      { path: '/einstellungen', component: EinstellungenPage }
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