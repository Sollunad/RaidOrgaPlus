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
                                          v-bind:key="anmeldung.id"
                                          class="anmeldung"/>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts">
	import Vue from 'vue';
    import ListAnmeldungEintragComp from "./ListAnmeldungEintragComp.vue";

    export default Vue.extend({
        name: "ListAnmeldungComp",
        components: {ListAnmeldungEintragComp},
        data: () => ({
            open: undefined,
        }),
        computed: {
            anmeldungen: function(): any {
              return this.$store.getters.anmeldungen;
            },
            yesCount: function(): any {
                return this.anmeldungen.filter((a: any) => a.type === 0).length;
            },
            maybeCount: function(): any {
                return this.anmeldungen.filter((a: any) => a.type === 1).length;
            },
            falseCount: function(): any {
                return this.anmeldungen.filter((a: any) => a.type === 2).length;
            },
            anmeldungCount: function(): any {
                return [this.yesCount, this.maybeCount, this.falseCount];
            },
            showDetailsInHeader: function(): boolean {
                return this.$store.getters.windowWidth > 500;
            }
        },
        methods: {
            anmeldungIcon: function(type: number): string {
                const icons = ['check_circle', 'check_circle_outline', 'cancel', 'help'];
                return icons[type];
            },
            anmeldungColor: function(type: number): string {
                const colors = ['green', 'yellow', 'red', 'grey'];
                return colors[type];
            }
        }
    })
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
