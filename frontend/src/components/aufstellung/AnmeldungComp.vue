<template>
    <v-btn-toggle v-model="buttonValue">
        <v-tooltip bottom>
            <v-btn flat color="green" slot="activator">
                <v-icon>check_circle</v-icon>
            </v-btn>
            Ich nehme teil
        </v-tooltip>
        <v-tooltip bottom>
            <v-btn flat color="yellow" slot="activator">
                <v-icon>check_circle_outline</v-icon>
            </v-btn>
            Ich nehme vielleicht teil
        </v-tooltip>
        <v-tooltip bottom>
            <v-btn flat color="red" slot="activator">
                <v-icon>cancel</v-icon>
            </v-btn>
            Ich nehme nicht teil
        </v-tooltip>
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