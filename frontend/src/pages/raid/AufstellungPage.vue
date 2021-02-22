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

<script lang="ts">
	import Vue from 'vue';
    import TerminToolbarComp from "../../components/aufstellung/TerminToolbarComp.vue";
    import AufstellungComp from '../../components/aufstellung/AufstellungComp.vue';
    import ArchiveDialogComp from "../../components/aufstellung/ArchiveDialogComp.vue";
    import DeleteDialogComp from "../../components/aufstellung/DeleteDialogComp.vue";
    import ShareDialogComp from "../../components/aufstellung/ShareDialogComp.vue";
    import ErsatzDialogComp from "../../components/aufstellung/ErsatzDialogComp.vue";

    export default Vue.extend({
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
            wsOutput: function(): any {
                return this.$store.getters.wsOutput;
            },
            ersatzspieler: function(): any {
                return this.$store.getters.ersatzspieler;
            },
            aufstellungen: function(): any {
                return this.$store.getters.aufstellungen;
            }
        },
        created: async function(): Promise<void> {
            if (!this.$store.getters.termin) window.location.href = '/#/raids';
            else {
                await this.$store.dispatch('loadAufstellungen');
            }
        },
        beforeDestroy: async function(): Promise<void> {
            await this.$store.dispatch('closeWS');
        },
        watch: {
            wsOutput: async function(value): Promise<void> {
                if (value) {
                    await this.$store.dispatch('clearWS');
                    if (value === 'Refresh') {
                        this.refresh();
                    }
                }
            }
        }
    })
</script>

<style scoped>

</style>
