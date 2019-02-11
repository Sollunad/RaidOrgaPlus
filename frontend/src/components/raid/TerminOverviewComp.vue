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
                                v-for="termin in viewTermine"
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
    import _termine from '../../services/endpoints/termine';
    import ListTerminComp from "./ListTerminComp";

    export default {
        name: "TerminOverviewComp",
        components: {ListTerminComp},
        props: ['raid', 'archived', 'user'],
        computed: {
            viewTermine: function() {
                if (this.archived) {
                    let viewTermine = [];
                    this.termine.forEach((termin, index) => {
                        termin.no = this.termine.length - index;
                        viewTermine.push(termin);
                    });
                    return viewTermine;
                } else {
                    return this.termine;
                }
            }
        },
        asyncComputed: {
            termine: async function() {
                if (this.raid) {
                    if (this.archived) return _termine.listArchived(this.raid.id);
                    else return _termine.listActive(this.raid.id);
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