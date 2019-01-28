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

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        flat="flat"
                        @click="deleteCancel"
                >
                    Abbrechen
                </v-btn>

                <v-btn
                        color="red darken-1"
                        flat="flat"
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
        methods: {
            deleteOK: function() {
                this.$emit('deleteOK');
            },
            deleteCancel: function() {
                this.$emit('deleteCancel');
            }
        },
    }
</script>

<style scoped>

</style>