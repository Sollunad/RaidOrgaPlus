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

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        flat="flat"
                        @click="archiveCancel"
                >
                    Abbrechen
                </v-btn>

                <v-btn
                        flat="flat"
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
        methods: {
            archiveOK: function() {
                this.$emit('archiveOK');
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

</style>