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
                        v-bind:propElement="propElement(i)"
                        v-bind:raid="raid"
                        v-bind:active="active"
                        v-bind:locked="locked"
                        v-bind:role="role"
                        v-bind:termin="termin"
                        v-bind:anmeldungen="anmeldungen"
                        v-bind:ersatz="ersatz">
                    </AufstellungElementComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import AufstellungElementComp from "./AufstellungElementComp";

    export default {
        name: "AufstellungBodyComp",
        components: {AufstellungElementComp},
        props: ['aufstellung', 'raid', 'active', 'locked', 'propElements', 'role', 'termin', 'anmeldungen', 'ersatz'],
        methods: {
            propElement: function(position) {
                if (this.propElements) return this.propElements.filter(e => e.pos === position)[0];
            }
        }
    }
</script>

<style scoped>

</style>