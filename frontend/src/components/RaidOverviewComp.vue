<template>
    <div>
        <v-progress-circular
                v-if="!raids"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <v-layout row>
            <v-card>
                <v-list two-line v-if="raids.length > 0">
                    <ListRaidComp
                            v-for="raid in raids"
                            v-bind:key="raid.id"
                            v-bind:raid="raid"
                    ></ListRaidComp>
                </v-list>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
    import ListRaidComp from '../components/ListRaidComp';
    import db_raids from '../services/raids.js';

    export default {
        name: "RaidOverviewComp",
        components: {ListRaidComp},
        props: ['user'],
        asyncComputed: {
            raids: function () {
                return db_raids.listForPlayer(this.user.id);
            }
        }
    }
</script>

<style scoped>

</style>