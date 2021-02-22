<template>
    <v-dialog
            v-model="open"
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

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "ArchiveDialogComp",
        data: () => ({
            newTermin: false,
        }),
        methods: {
            archiveOK: function(): void {
                this.$store.dispatch('archive', this.newTermin);
            },
            archiveCancel: function(): void {
                this.$store.dispatch('closeDialog');
            }
        },
        computed: {
            open: {
                get: function(): any {
                    return this.$store.getters.isDialogOpen('archive');
                },
                set: function(): void {
                    this.$store.dispatch('closeDialog');
                }
            }
        }
    })
</script>

<style scoped>
    .checkbox {
        margin-left: 5px;
    }
</style>