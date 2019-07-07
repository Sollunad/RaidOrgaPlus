<template>
    <div>
        <v-list two-line>
            <v-list-tile avatar
                 v-for="user in users"
                 :key="user.accname"
            >
                <v-list-tile-avatar>
                    <img :src="user.icon">
                </v-list-tile-avatar>
                <v-list-tile-content @click="openLink(user)">
                    <v-list-tile-title>{{ user.accname }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ user.name }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';

    export default {
        name: "ModUserListComp",
        data: () => ({
            users: [],
            open: null
        }),
        methods: {
            openLink: function(user) {
                this.$router.push(`/profil/${user.id}`);
            }
        },
        created: async function() {
            this.users = await _moderation.getUsers();
        }
    }
</script>

<style scoped>

</style>