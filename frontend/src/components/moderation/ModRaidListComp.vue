<template>
    <div>
        <ModRaidErstellenComp v-on:refresh="refresh"></ModRaidErstellenComp>
        <v-expansion-panels>
            <ModRaidListEntryComp v-for="raid in raids" :raid="raid" :key="raid.id" v-on:refresh="refresh"></ModRaidListEntryComp>
        </v-expansion-panels>
    </div>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';
    import ModRaidErstellenComp from "./ModRaidErstellenComp";
    import ModRaidListEntryComp from "./ModRaidListEntryComp";

    export default {
        name: "ModRaidListComp",
        components: {ModRaidListEntryComp, ModRaidErstellenComp},
        data: () => ({
            raids: []
        }),
        created: async function() {
            this.raids = await _moderation.getRaids();
        },
        methods: {
            refresh: async function() {
                this.raids = await _moderation.getRaids();
            }
        }
    }
</script>

<style scoped>

</style>