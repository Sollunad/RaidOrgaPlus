<template>
	<div>
		<h2 class="header">Lieutenants</h2>
		<v-divider class="divider" />
		<p>
			Lieutenants haben in etwa die gleichen Rechte wie Raid Leader: Sie können einen neuen Termin erstellen, diesen
			Archivieren oder Löschen, die Aufstellung bearbeiten etc.<br />
			Lieutenants können jedoch nicht Spieler aus dem Raid kicken, Spieler in den Raid einladen oder weitere Lieutenants ernennen. Außerdem ist die
			Anzahl an Lieutenants auf 2 pro Raid beschränkt.
		</p>
		<span>
			Lieutenants:
			<ul class="bulletList">
				<span v-for="lieutenant in getLieutenants()" :key="lieutenant.id" class="lieutenantContainer">
					<li style="min-width: 200px">
						<NameComp :user="lieutenant" />
					</li>
					<v-btn v-if="!disabled" icon @click="removeLieutenant(lieutenant)">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</span>
			</ul>
		</span>
		<v-dialog width="unset">
			<template v-slot:activator="{ on }">
				<v-btn v-on="on" class="lieutenantButton">
					Lieutenants
				</v-btn>
			</template>
			<div class="container">
				<v-autocomplete
					v-model="lieutenants"
					:disabled="isDisabled"
					:items="players"
					:filter="customFilter"
					:search-input.sync="searchInput"
					color="var(--v-textColor-base)"
					label="Eingeladene Spieler"
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
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue, { PropType } from "vue";
	import NameComp from "../menu/NameComp.vue";
	import _raids from "@/services/endpoints/raids";
	import { userRaid } from "models/Types";
	import { Spieler } from "models/Spieler";

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
			searchInput: '',
		}),
		computed: {
			isDisabled: function(): boolean {
				return this.disabled || this.lieutenants.length >= 2;
			}
		},
		methods: {
			customFilter: function(item: Spieler, queryText: string): boolean {
				const name = item.name.toLowerCase();
				const accname = item.accname.toLowerCase();
				const searchText = queryText.toLowerCase();

				return name.indexOf(searchText) > -1 || accname.indexOf(searchText) > -1;
			},
			getLieutenants: function(): Spieler[] {
				return this.players.filter(p => this.lieutenants.includes(p.id));
			},
			removeLieutenant: function(lieutenant: Spieler): void {
				this.lieutenants = this.lieutenants.filter(l => l != lieutenant.id);
			}
		},
		watch: {
			lieutenants: async function(newValue: number[], oldValue: number[]): Promise<void> {
				this.searchInput = '';
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

	.container {
        background-color: var(--v-dialogBox-base);
        padding: 10px;
    }

	.bulletList {
		margin-left: 12px;
	}

	.lieutenantContainer {
		display: flex;
		align-items: center;
	}

	.lieutenantButton {
		margin-top: 16px;
	}
</style>