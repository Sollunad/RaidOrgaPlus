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

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "EinladungComp",
        props: ['raid'],
        methods: {
            accept: function(): void {
                this.$emit('accept');
            },
            decline: function(): void {
                this.$emit('decline');
            }
        }
    })
</script>

<style scoped>

</style>