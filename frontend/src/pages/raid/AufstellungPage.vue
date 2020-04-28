<template>
    <div>
        <TerminToolbarComp
            v-on:anmelden="anmelden"
            v-bind:anmeldung="anmeldung"
            v-bind:role="role"
            v-bind:active="isActive"
            v-bind:termin="termin"
            v-bind:locked="locked"
            v-bind:anmeldungen="anmeldungen"
            v-on:addBoss="addBoss"
            v-on:archive="archive"
            v-on:refresh="refresh"
            v-on:share="share"
            v-on:ersatz="ersatz"
            v-on:changeLocked="changeLocked"
            v-on:deleteTermin="deleteTermin"
            v-on:upload="upload">
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
                                v-bind:aufstellung="aufstellung"
                                v-bind:all="aufstellungen"
                                v-bind:raid="raid"
                                v-bind:role="role"
                                v-bind:active="isActive"
                                v-bind:locked="locked"
                                v-bind:termin="termin"
                                v-bind:anmeldungen="anmeldungen"
                                v-bind:ersatz="ersatzspieler"
                                v-bind:elements="elementsForAufstellung(aufstellung.id)"
                                v-bind:uploadActive="uploadActive"
                                v-on:deleteBoss="deleteBoss"
                                v-on:refresh="refresh"
                                v-bind:wsClient="wsClient">
                        </AufstellungComp>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div
            v-if="isActive">
            <ArchiveDialogComp
                    v-bind:open="archiveDialogOpen"
                    v-on:archiveOK="archiveOK"
                    v-on:close="closeArchiveDialog">
            </ArchiveDialogComp>
            <DeleteDialogComp
                    v-bind:open="deleteDialogOpen"
                    v-on:deleteOK="deleteOK"
                    v-on:close="closeDeleteDialog">
            </DeleteDialogComp>
            <ShareDialogComp
                    v-bind:open="shareDialogOpen"
                    v-on:close="closeShareDialog"
                    v-bind:termin="termin">
            </ShareDialogComp>
            <ErsatzDialogComp
                    v-bind:open="ersatzDialogOpen"
                    v-on:close="closeErsatzDialog"
                    v-on:setErsatz="setErsatz"
                    v-bind:termin="termin"
                    v-bind:raid="raid">
            </ErsatzDialogComp>
        </div>
    </div>
</template>

<script>
    import TerminToolbarComp from "../../components/aufstellung/TerminToolbarComp";
    import AufstellungComp from '../../components/aufstellung/AufstellungComp';
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import _termine from '../../services/endpoints/termine';
    import ArchiveDialogComp from "../../components/aufstellung/ArchiveDialogComp";
    import DeleteDialogComp from "../../components/aufstellung/DeleteDialogComp";
    import ShareDialogComp from "../../components/aufstellung/ShareDialogComp";
    import ErsatzDialogComp from "../../components/aufstellung/ErsatzDialogComp";
    import WSClient from "../../services/websocket";

    export default {
        name: "AufstellungPage",
        components: {
            ErsatzDialogComp,
            ShareDialogComp, DeleteDialogComp, ArchiveDialogComp, TerminToolbarComp, AufstellungComp},
        props: ['termin', 'raid', 'role'],
        data: () => ({
            aufstellungen: null,
            anmeldungen: [],
            archiveDialogOpen: false,
            deleteDialogOpen: false,
            shareDialogOpen: false,
            ersatzDialogOpen: false,
            elements: [],
            locked: false,
            ersatzspieler: [],
            uploadActive: false,
            isActive: null,
            anmeldung: null,
            wsClient: null,
        }),
        methods: {
            anmelden: async function(type) {
                const user = this.$store.getters.loggedInUser;
                const changedAnmeldung = this.anmeldungen.find(a => a.id === user.id);
                if (changedAnmeldung) changedAnmeldung.type = type;
                else this.anmeldungen.push({id: user.id, name: user.name, type: type});
                await _termine.anmelden(this.termin.id, type);
                this.wsClient.sendRefresh();
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
                this.wsClient.sendRefresh();
            },
            deleteBoss: async function(aufstellungId) {
                this.aufstellungen = await _aufstellungen.deleteBoss(aufstellungId, this.termin.id);
                this.elements = await _aufstellungen.getElements(this.termin.id);
                this.wsClient.sendRefresh();
            },
            archive: function() {
                this.archiveDialogOpen = true;
            },
            archiveOK: async function(newTermin) {
                this.archiveDialogOpen = false;
                if (newTermin) {
                    this.createNewTermin();
                }
                await _termine.archive(this.termin.id);
                window.history.back();
            },
            closeArchiveDialog: function() {
                this.archiveDialogOpen = false;
            },
            elementsForAufstellung: function(aufstellung) {
                return this.elements.filter(e => e.aufstellung === aufstellung);
            },
            refresh: async function() {
                this.aufstellungen = await _aufstellungen.getForTermin(this.termin.id);
                this.elements = await _aufstellungen.getElements(this.termin.id);
                this.locked = await _termine.isLocked(this.termin.id);
                this.anmeldungen = await _termine.getAnmeldungenForTermin(this.termin.id);
            },
            changeLocked: async function() {
                this.elements = await _aufstellungen.getElements(this.termin.id);
                this.locked = !this.locked;
                await _termine.putLocked(this.termin.id, this.locked);
                this.wsClient.sendRefresh();
            },
            deleteTermin: function() {
                this.deleteDialogOpen = true;
            },
            deleteOK: async function(newTermin) {
                this.deleteDialogOpen = false;
                if (newTermin) {
                    this.createNewTermin();
                }
                await _termine.deleteTermin(this.termin.id);
                window.history.back();
            },
            closeDeleteDialog: function() {
                this.deleteDialogOpen = false;
            },
            share: function() {
                this.shareDialogOpen = true;
            },
            closeShareDialog: function() {
                this.shareDialogOpen = false;
            },
            ersatz: function() {
                this.ersatzDialogOpen = true;
            },
            closeErsatzDialog: function() {
                this.ersatzDialogOpen = false;
            },
            setErsatz: function(ersatz) {
                this.ersatzspieler = ersatz;
            },
            upload: function() {
                this.uploadActive = !this.uploadActive;
            },
            createNewTermin: async function() {
                const oldDate = this.termin.date.slice(4);
                const dmy = oldDate.split('.');
                const date = new Date(dmy[2], dmy[1] - 1, dmy[0]);
                // I have to add 8 days here to get 7 but I don't know why.
                date.setDate(date.getDate() + 8);
                const dateString = date.toISOString().substr(0, 10);
                await _termine.newTermin(this.raid.id, dateString, this.termin.time);
            }
        },
        computed: {
            wsOutput: function() {
                if (this.wsClient) {
                    return this.wsClient.output;
                } else {
                    return null;
                }
            }
        },
        created: async function() {
            if (!this.termin) window.location.href = '/#/raids';
            else {
                this.isActive = (!await _termine.isArchived(this.termin.id));
                this.aufstellungen = await _aufstellungen.getForTermin(this.termin.id);
                this.elements = await _aufstellungen.getElements(this.termin.id);
                this.locked = await _termine.isLocked(this.termin.id);
                this.anmeldungen = await _termine.getAnmeldungenForTermin(this.termin.id);
                if (this.isActive) {
                    this.anmeldung = await _termine.getAnmeldungForSpieler(this.termin.id);
                    this.wsClient = new WSClient(this.termin.id);
                }
            }
        },
        beforeDestroy: function() {
            if (this.wsClient) {
                this.wsClient.close();
            }
        },
        watch: {
            wsOutput: function(value) {
                if (value) {
                    this.wsClient.output = null;
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
