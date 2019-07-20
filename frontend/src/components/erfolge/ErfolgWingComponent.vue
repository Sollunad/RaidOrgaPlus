<template>
    <div>
        <v-avatar size="64">
            <img :src="wingIcon">
        </v-avatar>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="ach in wing.achievements"
                        :key="ach.id"
                        xs6 sm6 md3 xl2>
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
    import _icons from '../../services/icons';

    export default {
        name: "ErfolgWingComponent",
        components: {ErfolgComponent},
        props: ['allDone', 'wing'],
        computed: {
            wingIcon: function() {
                return _icons.wingIcon(this.wing.wing);
            }
        }
    }
</script>

<style scoped>

</style>