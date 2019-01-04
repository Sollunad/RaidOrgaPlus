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
    //TODO Aufstellungen für diesen Termin auslesen
    import AufstellungComp from "./AufstellungComp";
    import TerminToolbarComp from "./TerminToolbarComp";
    export default {
        name: "TerminComp",
        components: {TerminToolbarComp, AufstellungComp},
        props: ['terminId'],
        asyncComputed: {
            aufstellungen: function() {
                return [1,2,3,4,5,6,7,8,9]
            }
        }
    }
</script>

<style scoped>

</style>