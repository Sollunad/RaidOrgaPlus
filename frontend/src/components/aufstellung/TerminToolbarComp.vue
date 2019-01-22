<template>
    <div class="toolbar">
        <div class="datetime">
            {{termin.date}} {{termin.time}}
        </div>
        <AnmeldungComp
                v-on:anmelden="anmelden"
                v-bind:anmeldung="anmeldung"
                v-if="active"
                class="anmeldung">
        </AnmeldungComp>
        <p></p>
        <template
            v-if="active">
            <v-btn flat icon v-if="active" @click="refresh">
                <v-icon>refresh</v-icon>
            </v-btn>
            <template
                v-if="role > 0">
                <v-menu :close-on-content-click="false">
                    <v-btn flat icon slot="activator">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <MenuWingComp
                            v-on:pick="addBoss">
                    </MenuWingComp>
                </v-menu>
                <v-btn flat icon @click="changeLock">
                    <v-icon>{{ lockIcon }}</v-icon>
                </v-btn>
                <v-btn flat icon @click="archive">
                    <v-icon>send</v-icon>
                </v-btn>
            </template>
            <template
                v-if="role === 0 && locked">
                <v-btn flat icon>
                    <v-icon>lock</v-icon>
                </v-btn>
            </template>
        </template>



    </div>
</template>

<script>
    import MenuWingComp from "./MenuWingComp";
    import AnmeldungComp from "./AnmeldungComp";

    export default {
        name: "TerminToolbarComp",
        components: {AnmeldungComp, MenuWingComp},
        props: ['anmeldung', 'role', 'active', 'termin', 'locked'],
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

    .datetime {
    }
</style>