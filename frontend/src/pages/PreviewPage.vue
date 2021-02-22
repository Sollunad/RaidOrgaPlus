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

<script lang="ts">
	import Vue from 'vue';
    import AufstellungComp from "../components/aufstellung/AufstellungComp.vue";

    export default Vue.extend({
        name: "PreviewPage",
        components: {AufstellungComp},
        computed: {
            termin: function(): string {
                return this.$route.params.id;
            },
            aufstellungen: function(): any {
                return this.$store.getters.aufstellungen;
            }
        },
        methods: {
            backToMainPage: function(): void {
                window.location.href = '/';
            }
        },
        created: async function(): Promise<void> {
            await this.$store.dispatch('loadAufstellungenPreview', this.termin);
        }
    })
</script>

<style scoped>

</style>