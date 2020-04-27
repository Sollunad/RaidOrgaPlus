<template>
    <div>
        <v-navigation-drawer
                app
                v-model="drawer"
                v-if="show"
                clipped
                style="z-index: 10001">
            <MenuItemListComp/>
        </v-navigation-drawer>
        <MenuToolbarComp
            v-bind:loggedIn="show"
            v-on:toggleMenu="toggleMenu">
        </MenuToolbarComp>
    </div>
</template>

<script>
    import MenuItemListComp from "./MenuItemListComp";
    import MenuToolbarComp from "./MenuToolbarComp";

    export default {
        name: "MenuComp",
        props: ['show'],
        data: () => ({
            drawer: null,
        }),
        components: {
            MenuToolbarComp,
            MenuItemListComp,
        },
        methods: {
            toggleMenu: function() {
                this.drawer = !this.drawer;
            }
        }
    }

</script>

<style scoped>

</style>
