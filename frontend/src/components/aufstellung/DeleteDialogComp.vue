<template>
    <v-dialog
            v-model="open"
            max-width="290"
    >
        <v-card>
            <v-card-title class="headline">Termin löschen?</v-card-title>

            <v-card-text>
                Dadurch wird der Termin gelöscht!
                Dieser Vorgang kann nicht rückgängig gemacht werden!
            </v-card-text>

            <v-checkbox
                    class="checkbox"
                    color="success"
                    v-model="newTermin"
                    label="Neuen Termin in 7 Tagen erstellen"
            ></v-checkbox>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        text
                        @click="deleteCancel"
                >
                    Abbrechen
                </v-btn>

                <v-btn
                        color="red darken-1"
                        text
                        @click="deleteOK"
                >
                    Löschen
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DeleteDialogComp",
        data: () => ({
            newTermin: false,
        }),
        methods: {
            deleteOK: function() {
                this.$store.dispatch('delete', this.newTermin);
            },
            deleteCancel: function() {
                this.$store.dispatch('closeDialog');
            }
        },
        computed: {
            open: {
                get: function() {
                    return this.$store.getters.isDialogOpen('delete');
                },
                set: function() {
                    this.$store.dispatch('closeDialog');
                }
            }
        }
    }
</script>

<style scoped>
    .checkbox {
        margin-left: 5px;
    }
</style>