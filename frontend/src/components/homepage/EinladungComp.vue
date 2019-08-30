<template>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title>{{ raid.name }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn icon ripple @click="accept">
                <v-icon color="green">check_circle</v-icon>
            </v-btn>
        </v-list-item-action>
        <v-list-item-action>
            <v-btn icon ripple @click="decline">
                <v-icon color="red">cancel</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
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