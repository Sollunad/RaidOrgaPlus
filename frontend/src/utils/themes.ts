import { Framework } from "vuetify";
import { Theme } from "../../../models/Enums";

export function setTheme(theme: Theme, $vuetify: Framework): void {
	switch (theme) {
		case Theme.Light: {
			$vuetify.theme.dark = false;
			$vuetify.theme.themes.light.playerCard = '#F5F5F5';
			$vuetify.theme.themes.light.dialogBox = '#F5F5F5';
			$vuetify.theme.themes.light.menuColor = '#CCCCCC';
			$vuetify.theme.themes.light.tabHeader = '#CACACA';
			break;
		}
		case Theme.Dark: {
			$vuetify.theme.dark = true;
			$vuetify.theme.themes.dark.background = '#121212';
			$vuetify.theme.themes.dark.color = '#1E1E1E';
			$vuetify.theme.themes.dark.playerCard = '#222222';
			$vuetify.theme.themes.dark.dialogBox = '#444444';
			$vuetify.theme.themes.dark.menuColor = '#444444';
			$vuetify.theme.themes.dark.tabHeader = '#313131';
			break;
		}
		case Theme.OldDark: {
			$vuetify.theme.dark = true;
			$vuetify.theme.themes.dark.background = '#303030';
			$vuetify.theme.themes.dark.color = '#424242';
			$vuetify.theme.themes.dark.playerCard = '#222222';
			$vuetify.theme.themes.dark.dialogBox = '#444444';
			$vuetify.theme.themes.dark.menuColor = '#444444';
			$vuetify.theme.themes.dark.tabHeader = '#313131';
			break;
		}
	}
}