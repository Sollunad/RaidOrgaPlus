<template>
    <div>
        Wing {{wing.wing}}
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="ach in wing.achievements"
                        :key="ach.id"
                        xs12 sm6 md3 xl2>
                    <ErfolgComponent
                            v-bind:achievement="ach"
                            v-bind:allDone="allDone">
                    </ErfolgComponent>
                </v-flex>
            </v-layout>
        </v-container>
        <p></p>
    </div>
</template>

<script>
    import ErfolgComponent from "./ErfolgComponent";
    export default {
        name: "ErfolgWingComponent",
        components: {ErfolgComponent},
        props: ['allDone', 'wing']
    }
</script>

<style scoped>

</style>