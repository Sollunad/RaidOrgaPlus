<template>
    <div>
        <h2>Theme auswahl</h2>
        <p></p>
		<v-select v-model="selectedTheme" :items="selectableThemes" @change="themeChanged" outlined>
			<template v-slot:item="{ item }">
				<span> {{ getEnumName(item) }} </span>
			</template>
			<template v-slot:selection="{ item }">
				<span> {{ getEnumName(item) }} </span>
			</template>
		</v-select>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { UserActions } from '@/models/Store/UserState';
	import { setTheme } from '@/utils/themes';
	import { Theme } from '../../../../models/Enums';

    export default Vue.extend({
        name: "EinstellungenThemeComp",
        data: () => ({
			selectedTheme: Theme.Dark,
			selectableThemes: [
				Theme.Light,
				Theme.Dark,
				Theme.OldDark,
			]
        }),
        methods: {
            themeChanged: async function(): Promise<void> {
				setTheme(this.selectedTheme, this.$vuetify);
				this.$vStore.dispatch(UserActions.SetSelectedTheme, this.selectedTheme);
            },
			getEnumName: function(theme: Theme): string {
				if (theme === Theme.OldDark) {
					return 'Old Dark';
				}
				else {
					return Theme[theme];
				}
			}
        },
		created: function(): void {
			this.selectedTheme = this.$vStore.getters.selectedTheme;
			if (this.selectedTheme == null) {
				this.selectedTheme = Theme.Dark;
			}
		}
    })
</script>

<style scoped>

</style>