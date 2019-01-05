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
                        v-bind:elements="elements"
                        v-on:update="update">
                    </AufstellungElementComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import AufstellungElementComp from "./AufstellungElementComp";
    import element from '../../services/element';

    export default {
        name: "AufstellungBodyComp",
        components: {AufstellungElementComp},
        props: ['aufstellungId'],
        data: () => ({
           elements: null
        }),
        methods: {
            update: async function() {
                this.elements = await element.getForAufstellung(this.aufstellungId);
            }
        },
        created: function() {
            this.update();
        }
    }
</script>

<style scoped>

</style>