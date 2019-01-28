<template>
    <div>
        <v-list-tile avatar @click="save" :to="'/raid/aufstellung'">
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
    import _termine from '../../services/endpoints/termine';

    export default {
        name: "ListTerminComp",
        props: ['termin', 'user'],
        computed: {
            headline: function() {
                if (this.termin.no) {
                    return `#${this.termin.no} - ${this.termin.date}`;
                } else {
                    return this.termin.date;
                }
            }
        },
        methods: {
            save: function() {
                this.$emit('saveTermin', this.termin);
            }
        },
        asyncComputed: {
            icon: async function() {
                if (this.user) {
                    const anmeldung = await _termine.getAnmeldungForSpieler(this.user.id, this.termin.id);
                    if (anmeldung === null) return 'warning';
                    const icons = ['check_circle', 'check_circle_outline', 'cancel'];
                    return icons[anmeldung];
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>

</style>