<template>
    <div class="toolbar">
        <div class="datetime" v-if="termin">
            {{termin.date}} {{termin.time}}
        </div>
        <KommentarComp
                v-if="active === false"
                v-bind:termin="termin"
                v-bind:role="role">
        </KommentarComp>
        <template
            v-if="active">
            <AnmeldungComp
                    v-on:anmelden="anmelden"
                    v-bind:anmeldung="anmeldung"
                    class="anmeldung">
            </AnmeldungComp>
            <p></p>
            <v-tooltip bottom class="anmeldungen">
                <v-btn flat icon slot="activator">
                    <v-icon>people</v-icon>
                </v-btn>
                <ListAnmeldungComp
                    v-if="anmeldungen.length > 0"
                    v-bind:anmeldungen="anmeldungen">
                </ListAnmeldungComp>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn flat icon @click="refresh" slot="activator">
                    <v-icon>refresh</v-icon>
                </v-btn>
                <span>Refresh</span>
            </v-tooltip>
            <template
                v-if="role > 0">
                <v-tooltip bottom>
                    <v-menu :close-on-content-click="false" slot="activator">
                        <v-btn flat icon slot="activator">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <MenuWingComp
                                v-bind:showFC="true"
                                v-on:pick="addBoss">
                        </MenuWingComp>
                    </v-menu>
                    <span>Bosse hinzufügen</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn flat icon @click="changeLock" slot="activator">
                        <v-icon>{{ lockIcon }}</v-icon>
                    </v-btn>
                    <span>Editieren sperren</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn flat icon @click="ersatz" slot="activator">
                        <v-icon>perm_identity</v-icon>
                    </v-btn>
                    <span>Ersatzspieler</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn flat icon @click="share" slot="activator">
                        <v-icon>share</v-icon>
                    </v-btn>
                    <span>Aufstellung teilen</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn flat icon @click="archive" slot="activator">
                        <v-icon>send</v-icon>
                    </v-btn>
                    <span>Termin archivieren</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn flat icon color="red" @click="deleteTermin" slot="activator">
                        <v-icon>clear</v-icon>
                    </v-btn>
                    <span>Termin löschen</span>
                </v-tooltip>
            </template>
            <template
                v-if="role === 0 && locked">
                <v-btn flat icon>
                    <v-icon>lock</v-icon>
                </v-btn>
            </template>
        </template>
        <template v-if="!active && role > 0">
            <v-btn flat icon @click="uploadLog" class="button" v-if="!active">
                <v-icon>cloud_upload</v-icon>
            </v-btn>
        </template>
    </div>
</template>

<script>
    import MenuWingComp from "./MenuWingComp";
    import AnmeldungComp from "./AnmeldungComp";
    import ListAnmeldungComp from "./ListAnmeldungComp";
    import KommentarComp from "./KommentarComp";

    export default {
        name: "TerminToolbarComp",
        components: {KommentarComp, ListAnmeldungComp, AnmeldungComp, MenuWingComp},
        props: ['anmeldung', 'role', 'active', 'termin', 'locked', 'user', 'anmeldungen'],
        computed: {
            lockIcon: function() {
                return this.locked? 'lock' : 'lock_open';
            }
        },
        methods: {
            anmelden: function(type) {
                this.$emit('anmelden', type);
            },
            addBoss: function(info) {
                this.$emit('addBoss', info);
            },
            archive: function() {
                this.$emit('archive');
            },
            refresh: function() {
                this.$emit('refresh');
            },
            changeLock: function() {
                this.$emit('changeLocked');
            },
            deleteTermin: function() {
                this.$emit('deleteTermin');
            },
            share: function() {
                this.$emit('share');
            },
            ersatz: function() {
                this.$emit('ersatz');
            },
            uploadLog: function() {
                this.$emit('upload');
            }
        }
    }
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
</style>