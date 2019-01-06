<template>
    <div>
        <TerminToolbarComp
            v-on:anmelden="anmelden"
            v-bind:anmeldung="anmeldung"
            v-bind:role="role"
            v-bind:active="isActive"
            v-on:addBoss="addBoss"
            v-on:archive="archive">
        </TerminToolbarComp>
        <div v-if="aufstellungen">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex
                            v-for="aufstellungId in aufstellungen"
                            :key="aufstellungId"
                            xs12 md6 lg4 xl3>
                        <AufstellungComp
                                v-bind:aufstellungId="aufstellungId"
                                v-bind:raid="raid"
                                v-bind:role="role"
                                v-bind:active="isActive"
                                v-on:deleteBoss="deleteBoss">
                        </AufstellungComp>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <ArchiveDialogComp
            v-bind:open="archiveDialogOpen"
            v-on:archiveOK="archiveOK"
            v-on:archiveCancel="archiveCancel">
        </ArchiveDialogComp>
    </div>
</template>

<script>
    import TerminToolbarComp from "../../components/aufstellung/TerminToolbarComp";
    import AufstellungComp from '../../components/aufstellung/AufstellungComp';
    import aufstellung from '../../services/aufstellung';
    import termin from '../../services/termin';
    import ArchiveDialogComp from "../../components/aufstellung/ArchiveDialogComp";

    export default {
        name: "AufstellungPage",
        components: {ArchiveDialogComp, TerminToolbarComp, AufstellungComp},
        props: ['terminId', 'raid', 'role', 'user'],
        data: () => ({
            aufstellungen: null,
            archiveDialogOpen: false,
        }),
        asyncComputed: {
            anmeldung: function() {
                if (this.terminId) return termin.getAnmeldung(this.user.id, this.terminId);
                else return null;
            },
            isActive: async function() {
                if (this.terminId) return (!await termin.isArchived(this.terminId));
                else return false;
            }
        },
        methods: {
            anmelden: function(type) {
                termin.anmelden(this.user.id, this.terminId, type);
            },
            addBoss: async function(info) {
                const [boss, wing] = info;
                if (boss === 0) {
                    this.aufstellungen = await termin.addWing(this.terminId, wing);
                } else {
                    this.aufstellungen = await termin.addBoss(this.terminId, boss);
                }
            },
            deleteBoss: async function(aufstellungId) {
                this.aufstellungen = await aufstellung.deleteBoss(aufstellungId, this.terminId);
            },
            archive: function() {
                this.archiveDialogOpen = true;
            },
            archiveOK: function() {
                this.archiveDialogOpen = false;
                termin.archive(this.terminId).then(() => {
                    window.history.back();
                });
            },
            archiveCancel: function() {
                this.archiveDialogOpen = false;
            }
        },
        created: async function() {
            if (this.terminId === 0) window.location.href = '/#/raids';
            else {
                this.aufstellungen = await aufstellung.getForTermin(this.terminId);
            }
        }
    }
</script>

<style scoped>

</style>