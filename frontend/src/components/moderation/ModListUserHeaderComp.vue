<template>
    <v-list-tile avatar>
        <v-list-tile-avatar>
            <img :src="avatarLink">
        </v-list-tile-avatar>
        <v-list-tile-content v-bind:style="styleObject">
            <v-list-tile-title>{{ user.accname }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ user.name }}</v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    import _icons from '../../services/icons';

    export default {
        name: "ModListUserComp",
        props: ['user'],
        computed: {
            avatarLink: function() {
                if (this.user.discord) {
                    return this.user.discord.avatar;
                } else {
                    return _icons.miscIcon('raid');
                }
            },
            styleObject: function() {
                if (this.user.discord) {
                    return { color: this.user.discord.color };
                } else {
                    return { color: '#ff3333' };
                }

            }
        }
    }
</script>

<style scoped>

</style>