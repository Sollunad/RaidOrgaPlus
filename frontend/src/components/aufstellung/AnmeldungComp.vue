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
        props: ['foreignAnmeldung'],
        computed: {
            buttonValue: {
                get: function() {
                    if (this.foreignAnmeldung) {
                        return this.foreignAnmeldung;
                    }
                    return this.$store.getters.anmeldung;
                },
                set: async function(type){
                    if (this.foreignAnmeldung) {
                        this.$emit('anmelden', type);
                    } else {
                        await this.$store.dispatch('anmelden', type);
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>