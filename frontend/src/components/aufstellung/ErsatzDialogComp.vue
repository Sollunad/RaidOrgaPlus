<template>
	<div>
		<v-dialog v-model="open" max-width="290">
			<v-card>
				<div class="container">
					<v-autocomplete
						v-model="ersatz"
						:items="invitablePlayers"
						:filter="customFilter"
						:search-input.sync="searchInput"
						color="white"
						label="Ersatzspieler"
						no-data-text="Keine Spieler vorhanden"
						item-text="name"
						item-value="id"
						multiple
						chips
						deletable-chips
						hide-selected
					>
						<template slot="item" slot-scope="invitable">
							<NameComp :user="invitable.item"></NameComp>
						</template>
					</v-autocomplete>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import { MyActions } from "@/models/Store/State";
	import Vue from "vue";
	import NameComp from "../menu/NameComp.vue";

	export default Vue.extend({
		name: "ErsatzDialogComp",
		components: { NameComp },
		data: () => ({
			searchInput: "",
		}),
		computed: {
			termin: function(): any {
				return this.$vStore.getters.termin;
			},
			raid: function(): any {
				return this.$vStore.getters.raid;
			},
			open: {
				get: function(): boolean {
					return this.$vStore.getters.isDialogOpen("ersatz");
				},
				set: function(): void {
					this.$vStore.dispatch(MyActions.CloseDialog);
				},
			},
			ersatz: {
				get: function(): any[] {
					return this.$vStore.getters.ersatzIds;
				},
				set: function(newErsatz: any): void {
					this.searchInput = '';
					this.$vStore.dispatch(MyActions.UpdateErsatz, newErsatz);
				},
			},
			invitablePlayers: function(): any[] {
				return this.$vStore.getters.invitablePlayers;
			},
		},
		methods: {
			customFilter: function(item: any, queryText: string) {
				const name = item.name.toLowerCase();
				const accname = item.accname.toLowerCase();
				const searchText = queryText.toLowerCase();

				return name.indexOf(searchText) > -1 || accname.indexOf(searchText) > -1;
			},
		},
	});
</script>

<style scoped></style>
