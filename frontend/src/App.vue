<template>
  <v-app dark>
    <MenuComp
      v-bind:userId="userId"></MenuComp>
    <v-content>
      <MainPage v-if="loggedIn"></MainPage>
      <LoginPage v-else></LoginPage>
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

  import session from './services/session.js';
  import MainPage from "./pages/MainPage";
  import LoginPage from "./pages/LoginPage";

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
      LoginPage,
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