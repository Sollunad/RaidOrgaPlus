<template>
    <div class="toolbar">
        <div class="datetime" v-if="termin">
            {{headline}}
        </div>
        <KommentarComp
                v-if="active === false"
                v-bind:termin="termin"
                v-bind:role="role">
        </KommentarComp>

        <template
            v-if="active">
                <AnmeldungComp class="anmeldung">
                </AnmeldungComp>
                <ListAnmeldungComp
                        class="anmeldungen">
                </ListAnmeldungComp>
            <p></p>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn icon @click="refresh" v-on="on">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </template>
                <span>Refresh</span>
            </v-tooltip>
            <template
                v-if="role > 0">
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-menu :close-on-content-click="false" v-on="on">
                            <template v-slot:activator="{on}">
                                <v-btn icon v-on="on">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </template>
                            <MenuWingComp
                                    v-bind:showFC="true"
                                    v-on:pick="addBoss">
                            </MenuWingComp>
                        </v-menu>
                    </template>
                    <span>Bosse hinzufügen</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon @click="toggleLocked" v-on="on">
                            <v-icon>{{ lockIcon }}</v-icon>
                        </v-btn>
                    </template>
                    <span>Editieren sperren</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon @click="openErsatzDialog" v-on="on">
                            <v-icon>perm_identity</v-icon>
                        </v-btn>
                    </template>
                    <span>Ersatzspieler</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon @click="openShareDialog" v-on="on">
                            <v-icon>share</v-icon>
                        </v-btn>
                    </template>
                    <span>Aufstellung teilen</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon @click="openArchiveDialog" v-on="on">
                            <v-icon>send</v-icon>
                        </v-btn>
                    </template>
                    <span>Termin archivieren</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon color="red" @click="openDeleteDialog" v-on="on">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </template>
                    <span>Termin löschen</span>
                </v-tooltip>
            </template>
            <template
                v-if="role === 0 && locked">
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon v-on="on">
                            <v-icon>lock</v-icon>
                        </v-btn>
                    </template>
                    <span>Aufstellungen gesperrt</span>
                </v-tooltip>
            </template>
        </template>
        <template v-if="role > 0 && active === false">
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn icon @click="uploadLog" class="button" v-on="on">
                        <v-icon>cloud_upload</v-icon>
                    </v-btn>
                </template>
                <span>Logs uploaden</span>
            </v-tooltip>
        </template>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import MenuWingComp from "./MenuWingComp.vue";
    import AnmeldungComp from "./AnmeldungComp.vue";
    import ListAnmeldungComp from "./ListAnmeldungComp.vue";
    import KommentarComp from "./KommentarComp.vue";

    export default Vue.extend({
        name: "TerminToolbarComp",
        components: {KommentarComp, ListAnmeldungComp, AnmeldungComp, MenuWingComp},
        computed: {
            headline: function(): string {
              if (this.termin.endtime) {
                  return `${this.termin.date} ${this.termin.time} - ${this.termin.endtime}`;
              } else {
                  return `${this.termin.date} ${this.termin.time}`;
              }
            },
            lockIcon: function(): string {
                return this.locked? 'lock' : 'lock_open';
            },
            locked: function(): any {
                return this.$store.getters.isLocked;
            },
            role: function(): any {
                return this.$store.getters.raidRole;
            },
            termin: function(): any {
                return this.$store.getters.termin;
            },
            active: function(): any {
                return this.$store.getters.isActive;
            },
        },
        methods: {
            addBoss: function(info: any): void {
                this.$store.dispatch('addBoss', info);
            },
            openArchiveDialog: function(): void {
                this.$store.dispatch('openDialog', 'archive');
            },
            refresh: function(): void {
                this.$store.dispatch('refresh');
            },
            toggleLocked: async function(): Promise<void> {
                await this.$store.dispatch('toggleLocked');
            },
            openDeleteDialog: function(): void {
                this.$store.dispatch('openDialog', 'delete');
            },
            openShareDialog: function(): void {
                this.$store.dispatch('openDialog', 'share');
            },
            openErsatzDialog: function(): void {
                this.$store.dispatch('openDialog', 'ersatz');
            },
            uploadLog: function(): void {
                this.$store.dispatch('toggleUpload');
            }
        }
    })
</script>

<style scoped>
    .toolbar {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }

    .anmeldung {
        margin: 1rem 0 0 0.5rem;
    }

    .button {
        margin-top: 15px;
    }

    .anmeldungen {
        width: fit-content;
        position: absolute;
        top: 6.9rem;
        right: 3%;
        z-index: 1000;
    }
</style>
