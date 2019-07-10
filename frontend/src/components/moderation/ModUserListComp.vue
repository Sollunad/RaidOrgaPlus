<template>
    <div>
        <v-list two-line>
            <v-list-tile avatar
                 v-for="user in users"
                 :key="user.accname"
            >
                <v-list-tile-avatar>
                    <img :src="avatarLink(user)">
                </v-list-tile-avatar>
                <v-list-tile-content @click="openLink(user)">
                    <v-list-tile-title>{{ user.accname }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ user.name }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon>
                        keyboard_arrow_down
                    </v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';
    import _icons from '../../services/icons';

    export default {
        name: "ModUserListComp",
        data: () => ({
            users: [],
            open: null
        }),
        methods: {
            openLink: function(user) {
                this.$router.push(`/profil/${user.id}`);
            },
            avatarLink: function(user) {
                if (user.discord) {
                    return user.discord.avatar;
                } else {
                    return _icons.encIcon('tbd');
                }
            }
        },
        created: async function() {
            this.users = await _moderation.getUsers();
        }
    }
</script>

<style scoped>

</style>