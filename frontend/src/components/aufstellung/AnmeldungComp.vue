<template>
    <v-btn-toggle v-model="buttonValue" rounded>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn v-on="on">
                    <v-icon color="green">check_circle</v-icon>
                </v-btn>
            </template>
            Ich nehme teil
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn v-on="on">
                    <v-icon color="yellow">check_circle_outline</v-icon>
                </v-btn>
            </template>
            Ich nehme vielleicht teil
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn v-on="on">
                    <v-icon color="red">cancel</v-icon>
                </v-btn>
            </template>
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