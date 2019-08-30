<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs11 md8 xl4>
                <v-textarea
                        class="kommentar"
                        outline
                        label="Kommentar"
                        v-model="text"
                        counter="1000"
                        :rules="rules"
                        :readonly="!(role > 0)"
                ></v-textarea>
            </v-flex>
            <v-flex xs1>
                <v-btn icon class="button" @click="saveText" v-if="role > 0" :disabled="!isDirty">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import _termine from '../../services/endpoints/termine';

    export default {
        name: "KommentarComp",
        props: ['termin', 'role'],
        data: () => ({
            savedText: '',
            text: '',
            lastChange: 0,
        }),
        computed: {
            rules: function() {
                return [
                    v => (!v || v.length <= 1000) || 'Bitte halte dich kurz ;)'
                ];
            },
            isDirty: function() {
                return !(this.text === this.savedText);
            }
        },
        methods: {
            saveText: async function() {
                if (this.text.length <= 1000) {
                    await _termine.saveText(this.termin.id, this.text);
                    this.savedText = this.text;
                }
            }
        },
        created: async function() {
            this.text = await _termine.getText(this.termin.id);
            this.savedText = this.text;
        },
        watch: {
            text: function() {
                this.lastChange = Date.now();
                const currentChange = this.lastChange;
                const that = this;
                setTimeout(function() {
                    if (currentChange === that.lastChange && that.isDirty) {
                        that.saveText();
                    }
                }, 2000)
            }
        },
        beforeDestroy: function() {
            if (this.isDirty) {
                this.saveText();
            }
        }
    }
</script>

<style scoped>
    .kommentar {
        margin-top: 10px;
        margin-bottom: -40px;
    }
</style>