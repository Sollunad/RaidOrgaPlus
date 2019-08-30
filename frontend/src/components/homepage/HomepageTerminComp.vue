<template>
    <div>
        <v-list-item @click="save">
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