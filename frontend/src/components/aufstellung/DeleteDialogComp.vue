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

<script lang="ts">
	import { MyActions } from '@/models/Store/State';
	import Vue from 'vue';

    export default Vue.extend({
        name: "DeleteDialogComp",
        data: () => ({
            newTermin: false,
        }),
        methods: {
            deleteOK: function(): void {
                this.$vStore.dispatch(MyActions.Delete, this.newTermin);
            },
            deleteCancel: function(): void {
                this.$vStore.dispatch(MyActions.CloseDialog);
            }
        },
        computed: {
            open: {
                get: function(): any {
                    return this.$vStore.getters.isDialogOpen('delete');
                },
                set: function(): void {
                    this.$vStore.dispatch(MyActions.CloseDialog);
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