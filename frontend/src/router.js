import MeineRaidsPage from './pages/MeineRaidsPage.vue';
import RaidDashboardPage from "./pages/raid/RaidDashboardPage";
import RaidPage from './pages/RaidPage';
import TerminePage from "./pages/raid/TerminePage";
import AufstellungPage from "./pages/raid/AufstellungPage";
import ArchivPage from "./pages/raid/ArchivPage";
import EinstellungenPage from "./pages/EinstellungenPage";
import SkillsPage from "./pages/SkillsPage";
import StatistikenPage from "./pages/raid/StatistikenPage";
import NeuerTerminPage from "./pages/raid/NeuerTerminPage";
import SpielerlistePage from "./pages/raid/SpielerlistePage";
import HomePage from "./pages/HomePage";
import BlankoPage from "./pages/raid/BlankoPage";
import PreviewPage from "./pages/PreviewPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import ModerationPage from "./pages/ModerationPage";
import UserProfilePage from "./pages/UserProfilePage";
import VueRouter from "vue-router";
import HelpPage from "./pages/HelpPage";

const routes = [
    { path: '/', component: HomePage },
    { path: '/raids', component: MeineRaidsPage },
    { path: '/raid', component: RaidPage,
      children: [
          { path: '', component: RaidDashboardPage },
          { path: 'spielerliste', component: SpielerlistePage },
          { path: 'termine', component: TerminePage },
          { path: 'aufstellung', component: AufstellungPage },
          { path: 'archiv', component: ArchivPage },
          { path: 'statistiken', component: StatistikenPage },
          { path: 'neuerTermin', component: NeuerTerminPage },
          { path: 'blankos', component: BlankoPage },
      ]},
    { path: '/profil', component: UserProfilePage },
    { path: '/profil/:id', component: UserProfilePage },
    { path: '/einstellungen', component: EinstellungenPage },
    { path: '/skills', component: SkillsPage },
    { path: '/help', component: HelpPage },
    { path: '/preview/:id', component: PreviewPage },
    { path: '/moderation', component: ModerationPage },
    { path: '/reset/:token', component: PasswordResetPage },
];

const router = new VueRouter({routes});

export default router;