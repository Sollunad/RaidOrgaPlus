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
                <v-btn icon flat class="button" @click="saveText" v-if="role > 0">
                    <v-icon :color="buttonColor">save</v-icon>
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
            text: '',
            buttonColor: '',
        }),
        computed: {
            rules: function() {
                return [
                    v => (!v || v.length <= 1000) || 'Bitte halte dich kurz ;)'
                ];
            }
        },
        methods: {
            saveText: async function() {
                if (this.text.length <= 1000) {
                    await _termine.saveText(this.termin.id, this.text);
                    this.buttonColor = 'success';
                    const that = this;
                    setTimeout(function() {
                        that.buttonColor = '';
                    }, 2000)
                }
            }
        },
        created: function() {
            this.text = this.termin.text;
        }
    }
</script>

<style scoped>
    .kommentar {
        margin-top: 10px;
        margin-bottom: -40px;
    }
</style>