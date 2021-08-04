<template>
    <div>
        <ModRaidErstellenComp v-on:refresh="refresh"></ModRaidErstellenComp>
		<ModRaidOverviewComp :raids="raids" />
        <v-expansion-panels>
            <ModRaidListEntryComp v-for="raid in raids" :raid="raid" :key="raid.id" v-on:refresh="refresh" v-on:refreshRaids="refresh">
			</ModRaidListEntryComp>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _moderation from '../../services/endpoints/moderation';
    import ModRaidErstellenComp from "./ModRaidErstellenComp.vue";
    import ModRaidListEntryComp from "./ModRaidListEntryComp.vue";
	import ModRaidOverviewComp from './ModRaidOverviewComp.vue';
	import { ModRaid } from "models/Raid";

    export default Vue.extend({
        name: "ModRaidListComp",
        components: { ModRaidListEntryComp, ModRaidErstellenComp, ModRaidOverviewComp },
        data: () => ({
            raids: [] as ModRaid[]
        }),
        created: async function(): Promise<void> {
            this.raids = await _moderation.getRaids();
        },
        methods: {
            refresh: async function(): Promise<void> {
                this.raids = await _moderation.getRaids();
            }
        }
    })
</script>

<style scoped>

</style>