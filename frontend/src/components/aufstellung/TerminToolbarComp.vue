<template>
    <div class="toolbar">
        {{terminDate}} {{terminTime}}
        <v-menu :close-on-content-click="false" v-model="menuOpen" v-if="role > 0 && active">
            <v-btn flat icon slot="activator">
                <v-icon>add</v-icon>
            </v-btn>
            <MenuWingComp
                v-on:pick="addBoss">
            </MenuWingComp>
        </v-menu>
        <v-btn flat icon v-if="role > 0 && active" @click="archive">
            <v-icon>send</v-icon>
        </v-btn>
        <p></p>
        <AnmeldungComp
            v-on:anmelden="anmelden"
            v-bind:anmeldung="anmeldung"
            v-if="active">
        </AnmeldungComp>
    </div>
</template>

<script>
    import MenuWingComp from "./MenuWingComp";
    import AnmeldungComp from "./AnmeldungComp";
    export default {
        name: "TerminToolbarComp",
        components: {AnmeldungComp, MenuWingComp},
        props: ['anmeldung', 'role', 'active', 'termin'],
        data: () => ({
            menuOpen: false
        }),
        methods: {
            anmelden: function(type) {
                this.$emit('anmelden', type);
            },
            addBoss: function(info) {
                this.$emit('addBoss', info);
            },
            archive: function() {
                this.$emit('archive');
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
                    if (ymd[2] < 10) ymd[2] = '0' + ymd[2];
                    const weekdayId = new Date(ymd[0], ymd[1] - 1, ymd[2]).getDay();
                    const weekday = this.weekday(weekdayId);
                    const dateString = ymd.reverse().join('.');
                    return `${weekday}, ${dateString}`;
                } else {
                    return '';
                }
            },
            terminTime: function() {
                if (this.termin) {
                    return this.termin.time.slice(0,5);
                } else {
                    return '';
                }
            }
        },
    }
</script>

<style scoped>
    .toolbar {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }
</style>