<template>
	<v-dialog width="unset" class="einladenButton">
		<template v-slot:activator="{on}">
			<v-btn v-on="on" class="einladenButton">
				Lieutenants
			</v-btn>
		</template>
		<div class="container">
			<v-autocomplete v-model="lieutenants"
							:disabled="disabled"
							:items="players"
							:filter="customFilter"
							color="var(--v-textColor-base)"
							label="Eingeladene Spieler"
							no-data-text="Keine Spieler vorhanden"
							item-text="name"
							item-value="id"
							multiple
							chips
							deletable-chips
							hide-selected>
				<template slot="item" slot-scope="invitable">
					<NameComp :user="invitable.item"></NameComp>
				</template>
			</v-autocomplete>
		</div>
	</v-dialog>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
	import NameComp from "../menu/NameComp.vue";
	import _raids from '@/services/endpoints/raids';
	import { userRaid } from 'models/Types';
	import { Spieler } from 'models/Spieler';

	export default Vue.extend({
		name: "LieutenantComp",
		components: { NameComp },
		props: {
			raid: Object as PropType<userRaid>,
			disabled: Boolean
		},
		data: () => ({
			lieutenants: [] as number[],
			players: [] as Spieler[],
		}),
		methods: {
			customFilter: function (item: any, queryText: string): boolean {
				const name = item.name.toLowerCase();
				const accname = item.accname.toLowerCase();
				const searchText = queryText.toLowerCase();

				return name.indexOf(searchText) > -1 ||
					accname.indexOf(searchText) > -1
			}
		},
		watch: {
			lieutenants: async function (newValue: number[], oldValue: number[]): Promise<void> {
				if (oldValue === null) return;
				const invitedPlayer = newValue.find(player => !oldValue.includes(player));
				const deletedPlayer = oldValue.find(player => !newValue.includes(player));
				if (invitedPlayer) {
					await _raids.setLieutenantRole(this.raid.id, invitedPlayer, 1);
				} else if (deletedPlayer) {
					await _raids.setLieutenantRole(this.raid.id, deletedPlayer, 0);
				}
			}
		},
		created: async function(): Promise<void> {
			if (this.raid) {
				this.players = await _raids.listPlayers(this.raid.id);
				this.players = this.players.filter(s => s.role < 2);
				this.lieutenants = this.players.filter(s => s.role === 1).map(s => s.id);
			}
		}
	})
</script>

<style scoped>
</style>