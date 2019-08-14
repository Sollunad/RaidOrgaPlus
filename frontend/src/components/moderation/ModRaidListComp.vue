<template>
    <div>
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

    export default {
        name: "ModRaidListComp",
        components: {ModRaidSpielerListComp},
        data: () => ({
            raids: []
        }),
        created: async function() {
            this.raids = await _moderation.getRaids();
        }
    }
</script>

<style scoped>

</style>