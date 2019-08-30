<template>
    <v-list-item>
        <v-list-item-avatar>
            <img :src="avatarLink">
        </v-list-item-avatar>
        <v-list-item-content v-bind:style="styleObject">
            <v-list-item-title>{{ user.accname }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
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