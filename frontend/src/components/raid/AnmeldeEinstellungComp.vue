<template>
	<div>
		<h2 class="header">Misc.</h2>
		<v-divider class="divider" />
		<v-checkbox v-model="saveDate" label="Datum bei Anmeldungen mit speichern?" />
	</div>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "AnmeldeEinstellungComp",
		props: ["raid", "anmeldung"],
		data: () => ({
			saveDate: false
		}),
		computed: {
			// role: function(): string {
			//     switch(this.raid.role) {
			//         case 0: return "Spieler";
			//         case 1: return "Lieutenant";
			//         case 2: return "Raidleiter";
			//         default: return "";
			//     }
			// },
			// icon: function(): string {
			//     if (this.anmeldung) {
			//         const icons = ['check_circle', 'check_circle_outline', 'cancel', 'warning'];
			//         return icons.slice(this.anmeldung.type)[0];
			//     } else {
			//         return '';
			//     }
			// }
		},
		methods: {
			// saveRaid: function() {
			//     this.$vStore.dispatch(MyActions.OpenRaid, this.raid);
			// }
		}
	});
</script>

<style scoped>
	.header {
		font-style: italic;
		margin-top: 32px;
	}

	.divider {
		border-width: thick 0 0 0;
		margin-bottom: 20px;
	}
</style>