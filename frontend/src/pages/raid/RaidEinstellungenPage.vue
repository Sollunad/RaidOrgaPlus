<template>
    <div>
		<h3>Einstellungen</h3>
		<AnmeldeEinstellungComp />
		<TempRaidLeadComp />
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import AnmeldeEinstellungComp from '@/components/raid/AnmeldeEinstellungComp.vue';
	import TempRaidLeadComp from '@/components/raid/TempRaidLeadComp.vue';

    export default Vue.extend({
        name: "RaidEinstellungenPage",
        components: {
			AnmeldeEinstellungComp, TempRaidLeadComp
		},
    })
</script>

<style scoped>
</style>