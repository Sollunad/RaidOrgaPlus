<template>
    <div>
        <TerminToolbarComp></TerminToolbarComp>
        <div v-if="aufstellungen">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex
                            v-for="aufstellungId in aufstellungen"
                            :key="aufstellungId"
                            xs12 sm6 xl4>
                        <AufstellungComp
                                v-bind:aufstellungId="aufstellungId">
                        </AufstellungComp>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import AufstellungComp from "./AufstellungComp";
    import TerminToolbarComp from "./TerminToolbarComp";
    import aufstellung from '../services/aufstellung';

    export default {
        name: "TerminComp",
        components: {TerminToolbarComp, AufstellungComp},
        props: ['terminId'],
        asyncComputed: {
            aufstellungen: async function() {
                return await aufstellung.getForTermin(this.terminId);
            }
        }
    }
</script>

<style scoped>

</style>