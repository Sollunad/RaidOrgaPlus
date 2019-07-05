<template>
    <div>
        <v-expansion-panel
            v-model="open">
            <v-expansion-panel-content
                    v-for="user in users"
                    :key="user"
            >
                <template slot="header">
                    <div>{{ user.accname }}</div>
                </template>
                <v-card>
                    <v-card-text>{{ user.name }}</v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
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
        created: async function() {
            this.users = await _moderation.getUsers();
        }
    }
</script>

<style scoped>

</style>