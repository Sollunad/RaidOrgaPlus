<template>
    <div>
        <v-text-field
                outline
                label="Suche nach Spielern"
                prepend-inner-icon="search"
                v-model="filterText"
        ></v-text-field>
        <v-expansion-panel>
            <v-expansion-panel-content v-for="user in filteredUsers" :key="user.accname">
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
            open: null,
            filterText: '',
        }),
        computed: {
            filteredUsers: function() {
                return this.users.filter(u => this.isInFilter(u));
            }
        },
        methods: {
            isInFilter: function (user) {
                const name = user.name.toLowerCase();
                const accname = user.accname.toLowerCase();
                const searchText = this.filterText.toLowerCase();

                return name.indexOf(searchText) > -1 ||
                    accname.indexOf(searchText) > -1
            }
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