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
                        v-bind:aufstellung="aufstellung"
                        v-bind:elements="elements"
                        v-bind:raid="raid"
                        v-bind:active="active"
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
        props: ['aufstellung', 'raid', 'active', 'propElements'],
        data: () => ({
           elements: null
        }),
        methods: {
            update: async function(newElements) {
                this.elements = newElements;
            }
        },
        watch: {
            propElements: function(elements) {
                this.elements = elements;
            }
        }
    }
</script>

<style scoped>

</style>