<template>
    <div>
        <EinladungenComp
            v-bind:user="user"
            class="einladungen">
        </EinladungenComp>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 xl6>
                    <HomepageTermineComp
                            v-on:save="save">
                    </HomepageTermineComp>
                </v-flex>
                <v-flex xs12 xl6>
                    <ProgressOverviewComp
                            v-bind:user="user"
                            v-bind:ownProfile="true"
                            v-bind:width="width"
                            class="progress">
                    </ProgressOverviewComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import EinladungenComp from "../components/homepage/EinladungenComp";
    import HomepageTermineComp from "../components/homepage/HomepageTermineComp";
    import ProgressOverviewComp from "../components/profile/ProgressOverviewComp";

    export default {
        name: "HomePage",
        components: {ProgressOverviewComp, HomepageTermineComp, EinladungenComp},
        props: ['user', 'width'],
        methods: {
            save: function(clicked) {
                this.$emit('saveBoth', clicked);
            }
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