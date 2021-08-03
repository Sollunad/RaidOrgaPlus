<template>
    <div>
        <v-progress-circular
                v-if="!raids"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <v-layout row>
            <v-flex xs12 sm6 md4 lg3>
                <v-card>
                    <v-list two-line v-if="raids">
                        <ListRaidComp
                                v-for="raid in raids"
                                v-bind:key="raid.id"
                                v-bind:raid="raid"
                                v-bind:anmeldung="anmeldung(raid)"
                        ></ListRaidComp>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import ListRaidComp from './ListRaidComp.vue';
    import _raids from '../../services/endpoints/raids';
	import { userRaid } from 'models/Types';

    export default Vue.extend({
        name: "RaidOverviewComp",
        components: {ListRaidComp},
        data: () => ({
            raids: [] as userRaid[],
            anmeldungen: [] as any[]
        }),
        methods: {
            anmeldung: function(raid: any): any {
                if (this.anmeldungen) {
                    const anmeldung = this.anmeldungen.find(a => a.raid === raid.id);
                    return anmeldung;
                }
            }
        },
        created: async function() {
            this.raids = await _raids.listForPlayer();
            this.anmeldungen = await _raids.getAnmeldungState();
        }
    })
</script>

<style scoped>

</style>