<template>
    <div>
		<h1>Einstellungen</h1>
		<h2 class="header">Lieutenants</h2>
		<v-divider class="divider" />
		<LieutenantComp :raid="raid" :disabled="!isRaidLead" />
		<h2 class="header">Misc.</h2>
		<v-divider class="divider" />
		<AnmeldeEinstellungComp />
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import AnmeldeEinstellungComp from '@/components/raid/AnmeldeEinstellungComp.vue';
	import LieutenantComp from '@/components/raid/LieutenantComp.vue';
	import { userRaid } from 'models/Types';

	export default Vue.extend({
		name: "RaidEinstellungenPage",
		components: {
			AnmeldeEinstellungComp, LieutenantComp
		},
		computed: {
			raid: function(): userRaid {
				return this.$vStore.getters.raid;
			},
			isRaidLead: function(): boolean {
				return this.$vStore.getters.raidRole > 1;
			}
		}
	})
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