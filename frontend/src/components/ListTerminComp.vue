<template>
    <div>
        <v-list-tile avatar @click="saveId" :to="'/raid/aufstellung'">
            <v-list-tile-content>
                <v-list-tile-title v-html="termin.date"></v-list-tile-title>
                <v-list-tile-sub-title v-html="termin.time"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon>
                    <v-icon>check_circle</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </div>
</template>

<script>
    export default {
        name: "ListTerminComp",
        props: ['termin'],
        methods: {
            saveId: function() {
                this.$emit('saveTerminId', this.termin.id);
            }
        }
    }
</script>

<style scoped>

</style>