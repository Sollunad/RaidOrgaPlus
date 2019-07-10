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
        name: "HomepageTerminComp",
        props: ['termin'],
        computed: {
            headline: function() {
                return `${this.termin.date} (${this.termin.name})`;
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
                const emitRaid = { id: this.termin.raidID, name: this.termin.name, icon: this.termin.icon, role: this.termin.role };
                this.$emit('save', {termin: this.termin, raid: emitRaid});
            }
        }
    }
</script>

<style scoped>

</style>