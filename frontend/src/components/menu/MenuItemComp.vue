<template>
    <v-list-item :to="menuItem.route">
        <v-list-item-action>
            <v-icon>{{ menuItem.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    export default {
        name: "MenuItemComp",
        props: ['menuItem'],
    }
</script>

<style scoped>

</style>