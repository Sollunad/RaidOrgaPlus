<template>
    <div>
        <v-navigation-drawer
                app
                v-model="drawer"
                v-if="show"
                clipped>
            <MenuItemListComp/>
        </v-navigation-drawer>
        <MenuToolbarComp
            v-bind:loggedIn="show"
            v-on:toggleMenu="toggleMenu">
        </MenuToolbarComp>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import MenuItemListComp from "./MenuItemListComp.vue";
    import MenuToolbarComp from "./MenuToolbarComp.vue";

    export default Vue.extend({
        name: "MenuComp",
        props: ['show'],
        data: () => ({
            drawer: true,
        }),
        components: {
            MenuToolbarComp,
            MenuItemListComp,
        },
        methods: {
            toggleMenu: function(): void {
                this.drawer = !this.drawer;
            }
        }
    })

</script>

<style scoped>

</style>
