<template>
    <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon v-if="loggedIn" @click.stop="$emit('toggleMenu')"></v-toolbar-side-icon>
        <v-toolbar-title>RaidOrga+</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon
               v-if="loggedIn"
               @click="logout">
            <v-icon>logout</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    import _users from '../../services/endpoints/users';

    export default {
        name: "MenuToolbarComp",
        props: ['loggedIn'],
        methods: {
            logout: async function() {
                await _users.invalidateSession();
                localStorage.session = "";
                window.location.reload();
            }
        }
    }
</script>

<style scoped>

</style>