<template>
    <div>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="i in 10"
                        :key="i"
                        xs6>
                    <AufstellungElementComp
                        v-bind:position="i"
                        v-bind:aufstellungId="aufstellungId"
                        v-bind:elements="elements">
                    </AufstellungElementComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import AufstellungElementComp from "./AufstellungElementComp";
    import element from '../services/element';

    export default {
        name: "AufstellungBodyComp",
        components: {AufstellungElementComp},
        props: ['aufstellungId'],
        asyncComputed: {
            elements: function getElements() {
                return element.getForAufstellung(this.aufstellungId);
            }
        }
    }
</script>

<style scoped>

</style>