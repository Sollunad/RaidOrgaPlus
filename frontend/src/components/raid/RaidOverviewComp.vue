<template>
    <div>
        <v-progress-circular
                v-if="!raids"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <v-layout row>
            <v-flex xs12 sm6 md4 lg3 xl2>
                <v-card>
                    <v-list two-line v-if="raids">
                        <ListRaidComp
                                v-for="raid in raids"
                                v-bind:key="raid.id"
                                v-bind:raid="raid"
                                v-on:saveRaidId="saveRaidId"
                        ></ListRaidComp>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import ListRaidComp from './ListRaidComp';
    import _raids from '../../services/endpoints/raids.js';

    export default {
        name: "RaidOverviewComp",
        components: {ListRaidComp},
        props: ['user'],
        asyncComputed: {
            raids: function () {
                return _raids.listForPlayer(this.user.id);
            }
        },
        methods: {
            saveRaidId: function(id) {
                this.$emit('saveRaidId', id);
            }
        }
    }
</script>

<style scoped>

</style>