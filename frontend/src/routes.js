import MeineRaidsPage from './pages/MeineRaidsPage.vue';
import RaidDashboardPage from "./pages/raid/RaidDashboardPage";
import RaidPage from './pages/RaidPage';
import TerminePage from "./pages/raid/TerminePage";
import AufstellungPage from "./pages/raid/AufstellungPage";
import ArchivPage from "./pages/raid/ArchivPage";
import ProfilPage from "./pages/ProfilPage";
import SkillsPage from "./pages/SkillsPage";
import FeedbackPage from "./pages/FeedbackPage";
import StatistikenPage from "./pages/raid/StatistikenPage";
import NeuerTerminPage from "./pages/raid/NeuerTerminPage";
import SpielerlistePage from "./pages/raid/SpielerlistePage";
import HomePage from "./pages/HomePage";

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
      ]},
    { path: '/profil', component: ProfilPage },
    { path: '/skills', component: SkillsPage },
    { path: '/feedback', component: FeedbackPage },
];

export default routes;