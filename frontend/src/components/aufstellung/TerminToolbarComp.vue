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
                <ListAnmeldungComp
                        class="anmeldungen"
                        v-bind:anmeldungen="anmeldungen"
                        v-bind:width="width">
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
                        <v-btn icon @click="changeLock" v-on="on">
                            <v-icon>{{ lockIcon }}</v-icon>
                        </v-btn>
                    </template>
                    <span>Editieren sperren</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon @click="ersatz" v-on="on">
                            <v-icon>perm_identity</v-icon>
                        </v-btn>
                    </template>
                    <span>Ersatzspieler</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon @click="share" v-on="on">
                            <v-icon>share</v-icon>
                        </v-btn>
                    </template>
                    <span>Aufstellung teilen</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon @click="archive" v-on="on">
                            <v-icon>send</v-icon>
                        </v-btn>
                    </template>
                    <span>Termin archivieren</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                        <v-btn icon color="red" @click="deleteTermin" v-on="on">
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

<script>
    import MenuWingComp from "./MenuWingComp";
    import AnmeldungComp from "./AnmeldungComp";
    import ListAnmeldungComp from "./ListAnmeldungComp";
    import KommentarComp from "./KommentarComp";

    export default {
        name: "TerminToolbarComp",
        components: {KommentarComp, ListAnmeldungComp, AnmeldungComp, MenuWingComp},
        props: ['anmeldung', 'role', 'active', 'termin', 'locked', 'user', 'anmeldungen', 'width'],
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
            archive: function(newTermin) {
                this.$emit('archive', newTermin);
            },
            refresh: function() {
                this.$emit('refresh');
            },
            changeLock: function() {
                this.$emit('changeLocked');
            },
            deleteTermin: function(newTermin) {
                this.$emit('deleteTermin', newTermin);
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

    .button {
        margin-top: 15px;
    }

    .anmeldungen {
        width: fit-content;
        position: absolute;
        top: 6.9rem;
        right: 3%;
    }
</style>