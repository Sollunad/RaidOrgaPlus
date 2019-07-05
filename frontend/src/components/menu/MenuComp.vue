<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                v-if="show"
                clipped fixed app>
            <MenuHeaderComp v-bind:user="user"></MenuHeaderComp>
            <MenuItemListComp
                v-bind:user="user">
            </MenuItemListComp>
        </v-navigation-drawer>
        <MenuToolbarComp
            v-bind:loggedIn="show"
            v-on:toggleMenu="toggleMenu">
        </MenuToolbarComp>
    </div>
</template>

<script>
    import MenuHeaderComp from "./MenuHeaderComp";
    import MenuItemListComp from "./MenuItemListComp";
    import MenuToolbarComp from "./MenuToolbarComp";

    export default {
        name: "MenuComp",
        props: ['user', 'show'],
        data: () => ({
            drawer: null,
        }),
        components: {
            MenuToolbarComp,
            MenuItemListComp,
            MenuHeaderComp,
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