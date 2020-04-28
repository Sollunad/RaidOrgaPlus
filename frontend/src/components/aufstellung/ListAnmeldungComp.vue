<template>
    <v-expansion-panels
        v-model="open">
        <v-expansion-panel>
            <v-expansion-panel-header>
                <span v-if="showDetailsInHeader || open === 0">
                    <span v-for="(count, index) in anmeldungCount" v-bind:key="index">
                        <span>{{ anmeldungCount[index] }}</span>
                        <v-icon :color="anmeldungColor(index)" class="header-icon">{{anmeldungIcon(index)}}</v-icon>
                    </span>
                </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <ListAnmeldungEintragComp v-for="anmeldung in anmeldungen"
                                          v-bind:anmeldung="anmeldung"
                                          v-bind:role="role"
                                          v-bind:termin="termin"
                                          v-bind:key="anmeldung.id"
                                          v-on:refresh="refresh"
                                          class="anmeldung"/>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import ListAnmeldungEintragComp from "./ListAnmeldungEintragComp";

    export default {
        name: "ListAnmeldungComp",
        components: {ListAnmeldungEintragComp},
        props: ['anmeldungen', 'role', 'termin'],
        data: () => ({
            open: undefined,
        }),
        computed: {
            yesCount: function() {
                return this.anmeldungen.filter(a => a.type === 0).length;
            },
            maybeCount: function() {
                return this.anmeldungen.filter(a => a.type === 1).length;
            },
            falseCount: function() {
                return this.anmeldungen.filter(a => a.type === 2).length;
            },
            anmeldungCount: function() {
                return [this.yesCount, this.maybeCount, this.falseCount];
            },
            showDetailsInHeader: function() {
                return this.$store.getters.windowWidth > 500;
            }
        },
        methods: {
            anmeldungIcon: function(type) {
                const icons = ['check_circle', 'check_circle_outline', 'cancel', 'help'];
                return icons[type];
            },
            anmeldungColor: function(type) {
                const colors = ['green', 'yellow', 'red', 'grey'];
                return colors[type];
            },
            refresh: function() {
                this.$emit('refresh');
            }
        }
    }
</script>

<style scoped>
    .header-icon {
        margin-left: 0.2rem;
        margin-right: 1rem;
    }

    .anmeldung {
        margin-bottom: 1rem;
    }

    .anmeldung:last-child {
        margin-bottom: 0;
    }
</style>
