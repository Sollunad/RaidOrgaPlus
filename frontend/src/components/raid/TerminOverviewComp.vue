<template>
    <div>
        <v-progress-circular
                v-if="!termine"
                indeterminate
                color="primary"
        ></v-progress-circular>
        <div v-else-if="listNotEmpty" class="terminList">
            <v-layout row>
                <v-flex xs12 sm6 md4 lg3>
                    <v-pagination
                            v-if="archived"
                            circle
                            class="paginator"
                            v-model="page"
                            :length="maxPages"
                            :total-visible="7"
                    ></v-pagination>
                    <v-card>
                        <v-list two-line>
                            <ListTerminComp
                                    v-for="termin in viewTermine"
                                    v-bind:key="termin.id"
                                    v-bind:termin="termin"
                            ></ListTerminComp>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _termine from '../../services/endpoints/termine';
    import ListTerminComp from "./ListTerminComp.vue";

    export default Vue.extend({
        name: "TerminOverviewComp",
        components: {ListTerminComp},
        props: ['archived'],
        data: () => ({
            termine: [] as any[],
            page: 1,
            pageSize: 5,
        }),
        computed: {
            maxPages: function(): number {
                if (this.termine) {
                    return Math.ceil(this.termine.length / this.pageSize);
                } else {
                    return 1;
                }
            },
            viewTermine: function(): any[] {
                if (this.archived) {
                    let viewTermine: any[] = [];
                    this.termine.forEach((termin, index) => {
                        termin.no = this.termine.length - index;
                        viewTermine.push(termin);
                    });
                    const firstEntry = (this.page - 1) * this.pageSize;
                    const lastEntry = firstEntry + this.pageSize;
                    return viewTermine.slice(firstEntry, lastEntry);
                } else {
                    return this.termine;
                }
            },
            listNotEmpty: function(): boolean {
                if (this.termine) {
                    return this.termine.length !== 0;
                } else {
                    return false;
                }
            },
            raid: function(): any {
                return this.$vStore.getters.raid;
            }
        },
        created: async function(): Promise<void> {
            if (this.raid) {
                if (this.archived) this.termine = await _termine.listArchived(this.raid.id);
                else this.termine = await _termine.listActive(this.raid.id);
            }
        }
    })
</script>

<style scoped>
    .paginator {
        margin-bottom: 10px;
    }

    @media only screen and (max-width: 599px) {
        .paginator {
            margin-top: 10px;
        }
    }

    .terminList {
        margin-left: 10px;
    }
</style>