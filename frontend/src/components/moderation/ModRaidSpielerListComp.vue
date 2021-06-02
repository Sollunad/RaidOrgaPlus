<template>
    <div>
        <v-list two-line subheader>
            <ModRaidSpielerListEntryComp v-for="entry in spieler"
                                         :key="entry.id"
                                         :spieler="entry"
                                         :raid="raid"
                                         v-on:refresh="refresh">
            </ModRaidSpielerListEntryComp>
        </v-list>
    </div>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
    import ModRaidSpielerListEntryComp from "./ModRaidSpielerListEntryComp.vue";
	import { ModRaid } from 'models/Raid';
	import { Spieler } from 'models/Spieler';

    export default Vue.extend({
        name: "ModRaidSpielerListComp",
        components: {ModRaidSpielerListEntryComp},
		props: {
			spieler: Array as PropType<Spieler[]>,
			raid: Object as PropType<ModRaid>
		},
        methods: {
            refresh: function(): void {
                this.$emit('refresh');
            }
        }
    })
</script>

<style scoped>

</style>