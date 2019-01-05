<template>
    <div class="toolbar">
        Wochentag, Datum?
        <v-menu :close-on-content-click="false" v-model="menuOpen">
            <v-btn flat icon slot="activator">
                <v-icon>add</v-icon>
            </v-btn>
            <MenuWingComp></MenuWingComp>
        </v-menu>
        <p></p>
        <AnmeldungComp
            v-on:anmelden="anmelden"
            v-bind:anmeldung="anmeldung">
        </AnmeldungComp>
    </div>
</template>

<script>
    import MenuWingComp from "./MenuWingComp";
    import AnmeldungComp from "./AnmeldungComp";
    export default {
        name: "TerminToolbarComp",
        components: {AnmeldungComp, MenuWingComp},
        props: ['anmeldung'],
        data: () => ({
            menuOpen: false
        }),
        methods: {
            anmelden: function(type) {
                this.$emit('anmelden', type);
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