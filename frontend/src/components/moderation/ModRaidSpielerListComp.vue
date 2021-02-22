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
	import Vue from 'vue';
    import ModRaidSpielerListEntryComp from "./ModRaidSpielerListEntryComp.vue";

    export default Vue.extend({
        name: "ModRaidSpielerListComp",
        components: {ModRaidSpielerListEntryComp},
        props: ['spieler', 'raid'],
        methods: {
            refresh: function(): void {
                this.$emit('refresh');
            }
        }
    })
</script>

<style scoped>

</style>