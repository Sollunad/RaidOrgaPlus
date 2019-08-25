<template>
    <div>
        <ModRaidErstellenComp v-on:raid-created="refresh"></ModRaidErstellenComp>
        <v-expansion-panel>
            <v-expansion-panel-content v-for="raid in raids" :key="raid.id">
                <template slot="header">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ raid.name }} {{ raid.active? '' : '(inaktiv)' }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                <ModRaidSpielerListComp :spieler="raid.spieler"></ModRaidSpielerListComp>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';
    import ModRaidSpielerListComp from "./ModRaidSpielerListComp";
    import ModRaidErstellenComp from "./ModRaidErstellenComp";

    export default {
        name: "ModRaidListComp",
        components: {ModRaidErstellenComp, ModRaidSpielerListComp},
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