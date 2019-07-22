<template>
    <div>
        <v-expansion-panel>
            <v-expansion-panel-content v-for="raid in raids" :key="raid.id">
                <template v-slot:header>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ raid.name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
                {{raid}}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';

    export default {
        name: "ModRaidListComp",
        data: () => ({
            raids: [{id:2, name:'Mittwoch'}]
        }),
        created: async function() {
            this.raids = await _moderation.getRaids();
        }
    }
</script>

<style scoped>

</style>