<template>
    <v-list-tile>
        <v-list-tile-content>
            <v-list-tile-title>{{ raid.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
            <v-btn icon ripple @click="accept">
                <v-icon color="green">check_circle</v-icon>
            </v-btn>
        </v-list-tile-action>
        <v-list-tile-action>
            <v-btn icon ripple @click="decline">
                <v-icon color="red">cancel</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
    export default {
        name: "EinladungComp",
        props: ['raid'],
        methods: {
            accept: function() {
                this.$emit('accept');
            },
            decline: function() {
                this.$emit('decline');
            }
        }
    }
</script>

<style scoped>

</style>