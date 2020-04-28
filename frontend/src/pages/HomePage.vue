<template>
    <div>
        <EinladungenComp class="einladungen" />
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 xl6>
                    <HomepageTermineComp
                            v-on:save="save">
                    </HomepageTermineComp>
                </v-flex>
                <v-flex xs12 xl6>
                    <div v-if="hasNoApi">
                        <p>Gib einen API-Key in den Einstellungen an, um hier deinen wöchentlichen Raid-Progress und Erfolge zu sehen!</p>
                    </div>
                    <div v-else>
                        <ProgressOverviewComp
                                v-bind:user="user"
                                v-bind:ownProfile="true">
                        </ProgressOverviewComp>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import EinladungenComp from "../components/homepage/EinladungenComp";
    import HomepageTermineComp from "../components/homepage/HomepageTermineComp";
    import ProgressOverviewComp from "../components/profile/ProgressOverviewComp";
    import _users from '../services/endpoints/users';

    export default {
        name: "HomePage",
        components: {ProgressOverviewComp, HomepageTermineComp, EinladungenComp},
        data: () => ({
            hasNoApi: null
        }),
        computed: {
            user: function() {
                return this.$store.getters.loggedInUser;
            }
        },
        methods: {
            save: function(clicked) {
                this.$emit('saveBoth', clicked);
            }
        },
        created: async function() {
            this.hasNoApi = !(await _users.hasApi());
        }
    }
</script>

<style scoped>
    .einladungen {
        margin-bottom: 20px;
    }

    .progress {
        margin-top: 20px;
    }
</style>