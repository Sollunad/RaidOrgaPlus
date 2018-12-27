<template>
    <div>
        <v-progress-circular
                v-if="!termine"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <v-layout row
                v-else-if="listNotEmpty"
        >
            <v-flex xs12 sm6 md4 lg3>
                <v-card>
                    <v-list two-line>
                        <ListTerminComp
                                v-for="termin in termine"
                                v-bind:key="termin.id"
                                v-bind:termin="termin"
                                v-on:saveTerminId="saveTerminId"
                        ></ListTerminComp>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import db_termine from '../services/termin.js';
    import ListTerminComp from "./ListTerminComp";

    export default {
        name: "TerminOverviewComp",
        components: {ListTerminComp},
        props: ['raid', 'archived'],
        asyncComputed: {
            termine: function() {
                if (this.raid) {
                    if (this.archived) return db_termine.listArchived(this.raid.id);
                    else return db_termine.listActive(this.raid.id);
                }
            },
            listNotEmpty: function() {
                if (this.termine) {
                    return this.termine.length !== 0;
                }
            }
        },
        methods: {
            saveTerminId: function(id) {
                this.$emit('saveTerminId', id);
            }
        }
    }
</script>

<style scoped>

</style>