<template>
    <v-dialog
            v-model="openComputed"
            max-width="290"
    >
        <v-card>
            <v-card-title class="headline">Termin archivieren?</v-card-title>

            <v-card-text>
                Dadurch wird der Termin ins Archiv verschoben und kann nicht mehr bearbeitet werden!
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
                        @click="archiveCancel"
                >
                    Abbrechen
                </v-btn>

                <v-btn
                        text
                        @click="archiveOK"
                >
                    Archivieren
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ArchiveDialogComp",
        props: ['open'],
        data: () => ({
            newTermin: false,
        }),
        methods: {
            archiveOK: function() {
                this.$emit('archiveOK', this.newTermin);
            },
            archiveCancel: function() {
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