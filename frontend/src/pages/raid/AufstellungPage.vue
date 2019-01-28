<template>
    <div>
        <TerminToolbarComp
            v-on:anmelden="anmelden"
            v-bind:anmeldung="anmeldung"
            v-bind:role="role"
            v-bind:active="isActive"
            v-bind:termin="termin"
            v-bind:locked="locked"
            v-bind:user="user"
            v-on:addBoss="addBoss"
            v-on:archive="archive"
            v-on:refresh="refresh"
            v-on:changeLocked="changeLocked">
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
                            xs12 md6 lg4 xl3>
                        <AufstellungComp
                                v-bind:aufstellung="aufstellung"
                                v-bind:raid="raid"
                                v-bind:role="role"
                                v-bind:active="isActive"
                                v-bind:locked="locked"
                                v-bind:termin="termin"
                                v-bind:elements="elementsForAufstellung(aufstellung.id)"
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
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import _termine from '../../services/endpoints/termine';
    import ArchiveDialogComp from "../../components/aufstellung/ArchiveDialogComp";

    export default {
        name: "AufstellungPage",
        components: {ArchiveDialogComp, TerminToolbarComp, AufstellungComp},
        props: ['termin', 'raid', 'role', 'user'],
        data: () => ({
            aufstellungen: null,
            archiveDialogOpen: false,
            elements: [],
            locked: false,
        }),
        asyncComputed: {
            anmeldung: function() {
                if (this.termin) return _termine.getAnmeldungForSpieler(this.user.id, this.termin.id);
                else return null;
            },
            isActive: async function() {
                if (this.termin) return (!await _termine.isArchived(this.termin.id));
                else return false;
            }
        },
        methods: {
            anmelden: async function(type) {
                await _termine.anmelden(this.user.id, this.termin.id, type);
            },
            addBoss: async function(info) {
                const [boss, wing] = info;
                if (boss === 0) {
                    this.aufstellungen = await _termine.addWing(this.termin.id, wing);
                    this.elements = await _aufstellungen.getElements(this.termin.id);
                } else {
                    this.aufstellungen = await _termine.addBoss(this.termin.id, boss);
                    this.elements = await _aufstellungen.getElements(this.termin.id);
                }
            },
            deleteBoss: async function(aufstellungId) {
                this.aufstellungen = await _aufstellungen.deleteBoss(aufstellungId, this.termin.id);
                this.elements = await _aufstellungen.getElements(this.termin.id);
            },
            archive: function() {
                this.archiveDialogOpen = true;
            },
            archiveOK: function() {
                this.archiveDialogOpen = false;
                _termine.archive(this.termin.id).then(() => {
                    window.history.back();
                });
            },
            archiveCancel: function() {
                this.archiveDialogOpen = false;
            },
            elementsForAufstellung: function(aufstellung) {
                return this.elements.filter(e => e.aufstellung === aufstellung);
            },
            refresh: async function() {
                this.aufstellungen = await _aufstellungen.getForTermin(this.termin.id);
                this.elements = await _aufstellungen.getElements(this.termin.id);
            },
            changeLocked: async function() {
                this.elements = await _aufstellungen.getElements(this.termin.id);
                this.locked = !this.locked;
                await _termine.putLocked(this.termin.id, this.locked);
            }
        },
        created: async function() {
            if (!this.termin) window.location.href = '/#/raids';
            else {
                this.aufstellungen = await _aufstellungen.getForTermin(this.termin.id);
                this.elements = await _aufstellungen.getElements(this.termin.id);
                this.locked = await _termine.isLocked(this.termin.id);
            }
        }
    }
</script>

<style scoped>

</style>