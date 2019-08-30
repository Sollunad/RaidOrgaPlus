<template>
    <v-dialog
            v-model="openComputed"
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
        props: ['open'],
        data: () => ({
            newTermin: false,
        }),
        methods: {
            deleteOK: function() {
                this.$emit('deleteOK', this.newTermin);
            },
            deleteCancel: function() {
                this.$emit('close');
            }
        },
        computed: {
            openComputed: {
                get: function() {
                    return this.open;
                },
                set: function() {
                    this.$emit('close');
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