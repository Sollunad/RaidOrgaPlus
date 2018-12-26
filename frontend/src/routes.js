import MeineRaidsPage from './pages/MeineRaidsPage.vue';
import RaidDashboardPage from "./pages/RaidDashboardPage";
import RaidPage from './pages/RaidPage';
import TerminePage from "./pages/TerminePage";
import AufstellungPage from "./pages/AufstellungPage";
import ArchivPage from "./pages/ArchivPage";
import ProfilPage from "./pages/ProfilPage";
import SkillsPage from "./pages/SkillsPage";
import EinstellungenPage from "./pages/EinstellungenPage";
import RaidEinstellungenPage from "./pages/RaidEinstellungenPage";
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";

const routes = [
    { path: '/', component: HomePage },
    { path: '/raids', component: MeineRaidsPage },
    { path: '/raid', component: RaidPage,
      children: [
          { path: '', component: RaidDashboardPage },
          { path: 'termine', component: TerminePage },
          { path: 'aufstellung', component: AufstellungPage },
          { path: 'archiv', component: ArchivPage },
          { path: 'einstellungen', component: RaidEinstellungenPage },
      ]},
    { path: '/profil', component: ProfilPage },
    { path: '/skills', component: SkillsPage },
    { path: '/einstellungen', component: EinstellungenPage },
    { path: '/feedback', component: FeedbackPage },
];

export default routes;