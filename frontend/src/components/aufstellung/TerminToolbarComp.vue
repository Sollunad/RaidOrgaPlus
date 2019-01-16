<template>
    <div class="toolbar">
        {{termin.date}} {{termin.time}}
        <v-menu :close-on-content-click="false" v-model="menuOpen" v-if="role > 0 && active">
            <v-btn flat icon slot="activator">
                <v-icon>add</v-icon>
            </v-btn>
            <MenuWingComp
                v-on:pick="addBoss">
            </MenuWingComp>
        </v-menu>
        <v-btn flat icon v-if="role > 0 && active" @click="archive">
            <v-icon>send</v-icon>
        </v-btn>
        <p></p>
        <AnmeldungComp
            v-on:anmelden="anmelden"
            v-bind:anmeldung="anmeldung"
            v-if="active">
        </AnmeldungComp>
    </div>
</template>

<script>
    import MenuWingComp from "./MenuWingComp";
    import AnmeldungComp from "./AnmeldungComp";

    export default {
        name: "TerminToolbarComp",
        components: {AnmeldungComp, MenuWingComp},
        props: ['anmeldung', 'role', 'active', 'termin'],
        data: () => ({
            menuOpen: false
        }),
        methods: {
            anmelden: function(type) {
                this.$emit('anmelden', type);
            },
            addBoss: function(info) {
                this.$emit('addBoss', info);
            },
            archive: function() {
                this.$emit('archive');
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
</style>