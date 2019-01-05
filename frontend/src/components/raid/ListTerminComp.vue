<template>
    <div>
        <v-list-tile avatar @click="saveId" :to="'/raid/aufstellung'">
            <v-list-tile-content>
                <v-list-tile-title v-html="terminDate"></v-list-tile-title>
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
    import termin from '../../services/termin';

    export default {
        name: "ListTerminComp",
        props: ['termin', 'user'],
        methods: {
            saveId: function() {
                this.$emit('saveTerminId', this.termin.id);
            },
            weekday: function(id) {
                const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
                return days[id];
            }
        },
        computed: {
            terminDate: function() {
                if (this.termin) {
                    let ymd = this.termin.date.slice(0,10).split('-');
                    ymd[2] = parseInt(ymd[2]) + 1;
                    const weekdayId = new Date(ymd[0], ymd[1] - 1, ymd[2]).getDay();
                    const weekday = this.weekday(weekdayId);
                    const dateString = ymd.reverse().join('.');
                    return `${weekday}, ${dateString}`;
                } else {
                    return '';
                }
            }
        },
        asyncComputed: {
            icon: async function() {
                if (this.user) {
                    const anmeldung = await termin.getAnmeldung(this.user.id, this.termin.id);
                    if (anmeldung === null) return 'error';
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