<template>
    <v-app-bar app clipped-left color="#212121" style="z-index: 10000">
        <v-btn icon
               v-if="loggedIn"
               @click.stop="$emit('toggleMenu')">
            <v-icon>menu</v-icon>
        </v-btn>
        <v-toolbar-title>RaidOrga+</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon
               v-if="loggedIn"
               @click="logout">
            <v-icon>logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    import _users from '../../services/endpoints/users';
    import _cookies from '../../services/util/cookies';

    export default {
        name: "MenuToolbarComp",
        props: ['loggedIn'],
        methods: {
            logout: async function() {
                await _users.invalidateSession();
                _cookies.deleteCookie('session');
                window.location.reload();
            }
        }
    }
</script>

<style scoped>

</style>