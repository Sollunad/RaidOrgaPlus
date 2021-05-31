<template>
	<v-dialog v-model="dialog" width="unset" class="removeButton">
		<template v-slot:activator="{on}">
			<v-btn v-on="on" :disabled="disabled" class="removeButton" color="error">
				Raid Entfernen
			</v-btn>
		</template>

		<v-card>
			<v-card-title>
				Raid Löschen
			</v-card-title>

			<v-card-text>
				Bist du dir sicher das du den Raid <span class="font-weight-bold">{{raid.name}}</span> Löschen möchtest?
			</v-card-text>

			<v-divider />

			<v-card-actions>
				<v-spacer />
				<v-btn @click="removeRaid">
					Ja
				</v-btn>
				<v-btn @click="dialog = false">
					Nein
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
	import _moderation from '../../services/endpoints/moderation';
	import { ModRaid } from "models/Raid";

	export default Vue.extend({
		name: "ModRaidEntfernen",
		props: {
			disabled: Boolean,
			raid: Object as PropType<ModRaid>
		},
		data: () => ({
			dialog: false
		}),
		methods: {
			removeRaid: async function(): Promise<void> {
				await _moderation.removeRaid(this.raid.id, this.raid.name);
				this.dialog = false;
				this.$emit('refreshRaids')
			}
		}
	})
</script>

<style scoped>
	.removeButton {
		margin-bottom: 10px;
		padding-left: 10px;
	}
</style>