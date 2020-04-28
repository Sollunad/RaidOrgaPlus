<template>
    <div>
        <div class="headline kommendeTermineHeadline">Kommende Termine</div>
        <v-progress-circular
                v-if="!termine"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <v-layout row
                  v-else-if="listNotEmpty"
        >
            <v-flex xs12 sm6>
                <v-card>
                    <v-list two-line>
                        <HomepageTerminComp
                                v-for="termin in termine"
                                v-bind:key="termin.id"
                                v-bind:termin="termin"
                        ></HomepageTerminComp>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import _termine from '../../services/endpoints/termine';
    import HomepageTerminComp from "./HomepageTerminComp";

    export default {
        name: "HomepageTermineComp",
        components: {HomepageTerminComp},
        data: () => ({
            termine: null,
        }),
        computed: {
            listNotEmpty: function () {
                if (this.termine) {
                    return this.termine.length !== 0;
                } else {
                    return false;
                }
            }
        },
        created: async function () {
            this.termine = await _termine.getHomepageTermine();
        }
    }
</script>

<style scoped>
    .kommendeTermineHeadline {
        margin-bottom: 20px;
    }

    @media only screen and (max-width: 599px) {
        .kommendeTermineHeadline {
            margin: 5px 0 20px 5px;
        }
    }
</style>