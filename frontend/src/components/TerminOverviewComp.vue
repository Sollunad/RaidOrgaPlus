<template>
    <div>
        <p>Termine von {{raid.name}}</p>
        <v-progress-circular
                v-if="!termine"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <v-layout row>
            <v-card>
                <v-list two-line>
                    <ListTerminComp
                            v-for="termin in termine"
                            v-bind:key="termin.id"
                            v-bind:termin="termin"
                    ></ListTerminComp>
                </v-list>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
    import db_termine from '../services/termin.js';
    import ListTerminComp from "./ListTerminComp";
    import db_raids from "../services/raids";

    export default {
        name: "TerminOverviewComp",
        components: {ListTerminComp},
        computed: {
            raidId: function() {
                return localStorage.raidId;
            }
        },
        asyncComputed: {
            termine: function() {
                return db_termine.listActive(this.raidId);
            },
            raid: function () {
                return db_raids.give(this.raidId);
            }
        }
    }
</script>

<style scoped>

</style>