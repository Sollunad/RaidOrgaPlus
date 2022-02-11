import MeineRaidsPage from "./pages/MeineRaidsPage.vue";
import RaidDashboardPage from "./pages/raid/RaidDashboardPage.vue";
import RaidPage from "./pages/RaidPage.vue";
import TerminePage from "./pages/raid/TerminePage.vue";
import AufstellungPage from "./pages/raid/AufstellungPage.vue";
import ArchivPage from "./pages/raid/ArchivPage.vue";
import EinstellungenPage from "./pages/EinstellungenPage.vue";
import SkillsPage from "./pages/SkillsPage.vue";
import StatistikenPage from "./pages/raid/StatistikenPage.vue";
import NeuerTerminPage from "./pages/raid/NeuerTerminPage.vue";
import SpielerlistePage from "./pages/raid/SpielerlistePage.vue";
import HomePage from "./pages/HomePage.vue";
import BlankoPage from "./pages/raid/BlankoPage.vue";
import RaidEinstellungenPage from "./pages/raid/RaidEinstellungenPage.vue";
import PreviewPage from "./pages/PreviewPage.vue";
import PasswordResetPage from "./pages/PasswordResetPage.vue";
import ModerationPage from "./pages/ModerationPage.vue";
import UserProfilePage from "./pages/UserProfilePage.vue";
import VueRouter from "vue-router";
import HelpPage from "./pages/HelpPage.vue";

const routes = [
	{ path: "/", component: HomePage },
	{ path: "/raids", component: MeineRaidsPage },
	{
		path: "/raid",
		component: RaidPage,
		children: [
			{ path: "", component: RaidDashboardPage },
			{ path: "spielerliste", component: SpielerlistePage },
			{ path: "termine", component: TerminePage },
			{ path: "aufstellung", component: AufstellungPage },
			{ path: "archiv", component: ArchivPage },
			{ path: "statistiken", component: StatistikenPage },
			{ path: "neuerTermin", component: NeuerTerminPage },
			{ path: "blankos", component: BlankoPage },
			{ path: "settings", component: RaidEinstellungenPage },
		],
	},
	{ path: "/profil", component: UserProfilePage },
	{ path: "/profil/:id", component: UserProfilePage },
	{ path: "/einstellungen", component: EinstellungenPage },
	{ path: "/skills", component: SkillsPage },
	{ path: "/help", component: HelpPage },
	{ path: "/preview/:id", component: PreviewPage },
	{ path: "/moderation", component: ModerationPage },
	{ path: "/reset/:token", component: PasswordResetPage },
];

const router = new VueRouter({ routes });

export default router;
