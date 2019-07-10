<template>
    <div>
        <v-expansion-panel>
            <v-expansion-panel-content v-for="user in users" :key="user.accname">
                <template v-slot:header>
                    <ModListUserHeaderComp
                            v-bind:user="user">
                    </ModListUserHeaderComp>
                </template>
                <ModListUserBodyComp
                    class="listRowBody"
                    v-bind:user="user">
                </ModListUserBodyComp>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';
    import ModListUserHeaderComp from "./ModListUserHeaderComp";
    import ModListUserBodyComp from "./ModListUserBodyComp";

    export default {
        name: "ModUserListComp",
        components: {ModListUserBodyComp, ModListUserHeaderComp},
        data: () => ({
            users: [],
            open: null
        }),
        methods: {

        },
        created: async function() {
            this.users = await _moderation.getUsers();
        }
    }
</script>

<style scoped>
    .listRowBody {
        margin: 0 0 1% 1%;
    }
</style>