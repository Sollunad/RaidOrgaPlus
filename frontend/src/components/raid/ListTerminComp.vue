<template>
    <div>
        <v-list-item @click="openTermin" class="listTermin">
            <v-list-item-content>
                <v-list-item-title v-html="headline"></v-list-item-title>
                <v-list-item-subtitle v-html="termin.time"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn icon>
                    <v-icon>{{icon}}</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
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
            openTermin: function() {
                this.$store.dispatch('openTermin', this.termin);
            }
        }
    }
</script>

<style scoped>
    .listTermin {
        margin: 0 10px;
    }
</style>