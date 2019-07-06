<template>
    <div class="container">
        <EinladungenComp
            v-bind:user="user"
            class="einladungen">
        </EinladungenComp>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12>
                    <div v-if="hasNoApi">
                        <p>Gib einen API-Key im Profil an, um hier deinen wöchentlichen Raid-Progress zu sehen!</p>
                    </div>
                    <div v-else>
                        <ProgressComp
                                v-bind:user="user"
                                class="homecomp">
                        </ProgressComp>
                        <InsightsComp
                                v-bind:user="user"
                                class="homecomp">
                        </InsightsComp>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import EinladungenComp from "../components/einstellungen/EinladungenComp";
    import ProgressComp from "../components/progress/ProgressComp";
    import InsightsComp from "../components/progress/InsightsComp";
    import _users from '../services/endpoints/users';

    export default {
        name: "HomePage",
        components: {EinladungenComp, InsightsComp, ProgressComp},
        props: ['user'],
        asyncComputed: {
            hasNoApi: async function() {
                if (this.user) return !(await _users.hasApi());
            }
        }
    }
</script>

<style scoped>
    .einladungen {
        margin-bottom: 20px;
    }
</style>