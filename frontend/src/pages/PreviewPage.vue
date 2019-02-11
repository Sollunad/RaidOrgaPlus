<template>
    <div>
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
        computed: {
            termin: function() {
                return this.$route.params.id;
            }
        },
        asyncComputed: {
            aufstellungen: function() {
                return _preview.getAufstellungen(this.termin);
            },
            elements: function() {
                return _preview.getElements(this.termin);
            },
        },
        methods: {
            elementsForAufstellung: function(aufstellung) {
                if (this.elements) return this.elements.filter(e => e.aufstellung === aufstellung);
            },
        }
    }
</script>

<style scoped>

</style>