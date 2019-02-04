<template>
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
            <v-list-tile avatar>
                <v-list-tile-avatar
                        v-if="user">
                    <v-img :src="raidIcon"/>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>
                        <NameComp
                                v-if="user"
                                v-bind:user = "user"></NameComp></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-toolbar>
</template>

<script>
    import NameComp from "./NameComp";
    import _icons from '../../services/icons';

    export default {
        name: "MenuHeaderComp",
        props: ['user'],
        components: {
            NameComp,
        },
        computed: {
            raidIcon: function() {
                return _icons.miscIcon('raid');
            }
        },
    }
</script>

<style scoped>

</style>