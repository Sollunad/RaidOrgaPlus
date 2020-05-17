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
                                v-bind:aufstellung="aufstellung">
                        </AufstellungComp>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import AufstellungComp from "../components/aufstellung/AufstellungComp";

    export default {
        name: "PreviewPage",
        components: {AufstellungComp},
        computed: {
            termin: function() {
                return this.$route.params.id;
            },
            aufstellungen: function() {
                return this.$store.getters.aufstellungen;
            }
        },
        methods: {
            backToMainPage: function() {
                window.location.href = '/';
            }
        },
        created: async function() {
            await this.$store.dispatch('loadAufstellungenPreview', this.termin);
        }
    }
</script>

<style scoped>

</style>