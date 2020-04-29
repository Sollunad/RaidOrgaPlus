<template>
    <div>
        <TerminToolbarComp>
        </TerminToolbarComp>
        <v-progress-circular
                v-if="!aufstellungen"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <div v-if="aufstellungen">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex
                            v-for="aufstellung in aufstellungen"
                            :key="aufstellung.id"
                            xs12 md6 xl3>
                        <AufstellungComp
                                v-bind:aufstellung="aufstellung">
                        </AufstellungComp>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <ArchiveDialogComp />
        <DeleteDialogComp />
        <ShareDialogComp />
        <ErsatzDialogComp />
    </div>
</template>

<script>
    import TerminToolbarComp from "../../components/aufstellung/TerminToolbarComp";
    import AufstellungComp from '../../components/aufstellung/AufstellungComp';
    import ArchiveDialogComp from "../../components/aufstellung/ArchiveDialogComp";
    import DeleteDialogComp from "../../components/aufstellung/DeleteDialogComp";
    import ShareDialogComp from "../../components/aufstellung/ShareDialogComp";
    import ErsatzDialogComp from "../../components/aufstellung/ErsatzDialogComp";

    export default {
        name: "AufstellungPage",
        components: {
            ErsatzDialogComp,
            ShareDialogComp, DeleteDialogComp, ArchiveDialogComp, TerminToolbarComp, AufstellungComp},
        methods: {
            refresh: async function() {
                await this.$store.dispatch('refresh');
            },
        },
        computed: {
            wsOutput: function() {
                return this.$store.getters.wsOutput;
            },
            ersatzspieler: function() {
                return this.$store.getters.ersatzspieler;
            },
            aufstellungen: function() {
                return this.$store.getters.aufstellungen;
            }
        },
        created: async function() {
            if (!this.$store.getters.termin) window.location.href = '/#/raids';
            else {
                await this.$store.dispatch('loadAufstellungen');
            }
        },
        beforeDestroy: async function() {
            await this.$store.dispatch('closeWS');
        },
        watch: {
            wsOutput: async function(value) {
                if (value) {
                    await this.$store.dispatch('clearWS');
                    if (value === 'Refresh') {
                        this.refresh();
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
