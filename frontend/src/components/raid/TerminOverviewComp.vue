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
                                v-bind:user="user"
                                v-on:saveTermin="saveTermin"
                        ></ListTerminComp>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import db_termine from '../../services/termine.js';
    import ListTerminComp from "./ListTerminComp";

    export default {
        name: "TerminOverviewComp",
        components: {ListTerminComp},
        props: ['raid', 'archived', 'user'],
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
            saveTermin: function(termin) {
                this.$emit('saveTermin', termin);
            }
        }
    }
</script>

<style scoped>

</style>