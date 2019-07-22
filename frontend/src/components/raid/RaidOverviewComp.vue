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
                                v-on:saveRaid="saveRaid"
                                v-bind:user="user"
                        ></ListRaidComp>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import ListRaidComp from './ListRaidComp';
    import _raids from '../../services/endpoints/raids';

    export default {
        name: "RaidOverviewComp",
        components: {ListRaidComp},
        props: ['user'],
        data: () => ({
            raids: [],
            anmeldungen: []
        }),
        methods: {
            saveRaid: function(raid) {
                this.$emit('saveRaid', raid);
            },
            anmeldung: function(raid) {
                if (this.anmeldungen) {
                    const anmeldung = this.anmeldungen.filter(a => a.raid === raid.id)[0];
                    return anmeldung;
                }
            }
        },
        created: async function() {
            this.raids = await _raids.listForPlayer();
            this.anmeldungen = await _raids.getAnmeldungState();
        }
    }
</script>

<style scoped>

</style>