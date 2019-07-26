<template>
    <div>
        <v-btn @click="backToMainPage">
            Zurück zur Hauptseite
        </v-btn>
        <div v-if="aufstellungen">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex
                            v-for="aufstellung in aufstellungen"
                            :key="aufstellung.id"
                            xs12 md6 xl3>
                        <AufstellungComp
                                v-bind:aufstellung="aufstellung"
                                v-bind:elements="elementsForAufstellung(aufstellung.id)"
                                v-bind:active="true"
                                v-bind:locked="true">
                        </AufstellungComp>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import _preview from '../services/endpoints/preview';
    import AufstellungComp from "../components/aufstellung/AufstellungComp";

    export default {
        name: "PreviewPage",
        components: {AufstellungComp},
        data: () => ({
            aufstellungen: [],
            elements: []
        }),
        computed: {
            termin: function() {
                return this.$route.params.id;
            }
        },
        methods: {
            elementsForAufstellung: function(aufstellung) {
                if (this.elements) return this.elements.filter(e => e.aufstellung === aufstellung);
            },
            backToMainPage: function() {
                window.location.href = '/';
            }
        },
        created: async function() {
            this.aufstellungen = await _preview.getAufstellungen(this.termin);
            this.elements = await _preview.getElements(this.termin);
        }
    }
</script>

<style scoped>

</style>