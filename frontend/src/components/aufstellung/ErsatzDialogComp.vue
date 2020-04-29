<template>
    <div>
        <v-dialog
                v-model="open"
                max-width="290"
        >
            <v-card>
                <div class="container">
                    <v-autocomplete
                            v-model="ersatz"
                            :items="invitablePlayers"
                            :filter="customFilter"
                            color="white"
                            label="Ersatzspieler"
                            no-data-text="Keine Spieler vorhanden"
                            item-text="name"
                            item-value="id"
                            multiple
                            chips
                            deletable-chips
                            hide-selected
                    >
                        <template slot="item" slot-scope="invitable">
                            <NameComp :user="invitable.item"></NameComp>
                        </template>
                    </v-autocomplete>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import NameComp from "../menu/NameComp";

    export default {
        name: "ErsatzDialogComp",
        components: {NameComp},
        computed: {
            termin: function() {
                return this.$store.getters.termin;
            },
            raid: function() {
                return this.$store.getters.raid;
            },
            open: {
                get: function() {
                    return this.$store.getters.isDialogOpen('ersatz');
                },
                set: function() {
                    this.$store.dispatch('closeDialog');
                }
            },
            ersatz: {
                get: function() {
                    return this.$store.getters.ersatzIds;
                },
                set: function(newErsatz) {
                    this.$store.dispatch('updateErsatz', newErsatz);
                }
            },
            invitablePlayers: function() {
                return this.$store.getters.invitablePlayers;
            }
        },
        methods: {
            customFilter: function (item, queryText) {
                const name = item.name.toLowerCase();
                const accname = item.accname.toLowerCase();
                const searchText = queryText.toLowerCase();

                return name.indexOf(searchText) > -1 ||
                    accname.indexOf(searchText) > -1
            },
        }
    }
</script>

<style scoped>

</style>