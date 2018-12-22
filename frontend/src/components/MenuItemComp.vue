<template>
    <v-list-tile @click="" :to="menuItem.route">
        <v-list-tile-action>
            <v-icon>{{ menuItem.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>{{ menuItem.title }}</v-list-tile-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    export default {
        name: "MenuItemComp",
        props: ['menuItem'],
    }
</script>

<style scoped>

</style>