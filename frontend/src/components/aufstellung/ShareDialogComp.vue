<template>
    <v-dialog
            v-model="open"
            max-width="400"
    >
        <v-card>
            <v-card-title class="headline">Aufstellung teilen</v-card-title>

            <v-card-text>
                Wenn die Aufstellung geteilt wird, ist sie ohne Anmeldung unter folgendem Link zu sehen:
            </v-card-text>

            <v-text-field
                    v-model="previewLink"
                    single-line
                    readonly
                    box
                    class="textfield"
                    append-icon="filter_none"
                    @click:append="copyLink"
            ></v-text-field>

            <span class="successText" v-if="copied">
                Link in Zwischenablage kopiert!
            </span>

            <v-switch v-model="switchValue" label="Teilen" class="switch"></v-switch>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
	import { MyActions } from '@/models/Store/State';
import { getURL } from '@/utils/misc';
	import Vue from 'vue';
    import _preview from '../../services/endpoints/preview';

    export default Vue.extend({
        name: "ShareDialogComp",
        data: () => ({
            switched: false,
            copied: false,
        }),
        computed: {
            termin: function(): any {
                return this.$vStore.getters.termin;
            },
            switchValue: {
                get: function(): boolean {
                    return this.switched;
                },
                set: async function(value: boolean): Promise<void> {
                    this.switched = value;
                    await _preview.setPreviewable(this.termin.id, value);
                }
            },
            open: {
                get: function(): boolean {
                    return this.$vStore.getters.isDialogOpen('share');
                },
                set: function(): void {
                    this.$vStore.dispatch(MyActions.CloseDialog);
                }
            },
            previewLink: function(): string {
				return getURL() + `preview/${this.termin.id}`;
                // return `https://orga.rising-light.de/#/preview/${this.termin.id}`;
            }
        },
        created: async function(): Promise<void> {
            this.switched = await _preview.getPreviewable(this.termin.id);
        },
        methods: {
            copyLink: async function(): Promise<void> {
                await navigator.clipboard.writeText(this.previewLink);
                this.switchValue = true;
                this.copied = true;
            }
        }
    })
</script>

<style scoped>
    .textfield {
        margin: 0 10px 0 10px;
    }

    .switch {
        margin-left: 15px;
    }

    .successText {
        margin-left: 15px;
    }
</style>