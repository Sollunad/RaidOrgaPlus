<template>
    <div>
        <v-list-tile avatar @click="save">
            <v-list-tile-content>
                <v-list-tile-title v-html="headline"></v-list-tile-title>
                <v-list-tile-sub-title v-html="termin.time"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon>
                    <v-icon>{{icon}}</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </div>
</template>

<script>
    export default {
        name: "ListTerminComp",
        props: ['termin'],
        computed: {
            headline: function() {
                if (this.termin.no) {
                    return `#${this.termin.no} - ${this.termin.date}`;
                } else {
                    return this.termin.date;
                }
            },
            icon: function() {
                if (this.termin) {
                    if (this.termin.type === null) return 'warning';
                    const icons = ['check_circle', 'check_circle_outline', 'cancel'];
                    return icons[this.termin.type];
                } else {
                    return '';
                }
            }
        },
        methods: {
            save: function() {
                this.$emit('saveTermin', this.termin);
            }
        }
    }
</script>

<style scoped>

</style>