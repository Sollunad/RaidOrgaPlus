<template>
    <v-btn-toggle v-model="buttonValue">
        <v-btn flat color="green">
            <v-icon>check_circle</v-icon>
        </v-btn>
        <v-btn flat color="yellow">
            <v-icon>help</v-icon>
        </v-btn>
        <v-btn flat color="red">
            <v-icon>cancel</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script>
    export default {
        name: "AnmeldungComp",
        props: ['anmeldung'],
        computed: {
            buttonValue: {
                get: function() {
                    return this.anmeldung;
                },
                set: function(type){
                    this.$emit('anmelden', type);
                }
            }
        }
    }
</script>

<style scoped>

</style>