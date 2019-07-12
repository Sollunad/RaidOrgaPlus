<template>
    <v-dialog
            v-model="openComputed"
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

<script>
    import _preview from '../../services/endpoints/preview';

    export default {
        name: "ShareDialogComp",
        props: ['open', 'termin'],
        data: () => ({
            switched: false,
            copied: false,
        }),
        computed: {
            switchValue: {
                get: function() {
                    return this.switched;
                },
                set: async function(value) {
                    this.switched = value;
                    await _preview.setPreviewable(this.termin.id, value);
                }
            },
            openComputed: {
                get: function() {
                    return this.open;
                },
                set: function() {
                    this.$emit('close');
                }
            },
            previewLink: function() {
                return `https://orga.sollunad.de/#/preview/${this.termin.id}`;
            }
        },
        created: async function() {
            this.switched = await _preview.getPreviewable(this.termin.id);
        },
        methods: {
            copyLink: async function() {
                await navigator.clipboard.writeText(this.previewLink);
                this.switchValue = true;
                this.copied = true;
            }
        }
    }
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