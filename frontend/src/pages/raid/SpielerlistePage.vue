<template>
    <div>
        <SpielerEinladenComp
            v-if="showSpielerEinladen"
            v-bind:raid="raid">
        </SpielerEinladenComp>
        <!-- TODO: Reactivate #297 -->
        <BuildFilterButtonsComp
                v-if="false"
                v-on:setFilter="setFilter">
        </BuildFilterButtonsComp>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex
                        v-for="listuser in users"
                        :key="listuser.id"
                        xs12 sm6 lg4 xl3>
                    <SpielerComp
                            v-bind:user="listuser"
                            v-bind:filter="filter"
                            v-on:kick="kick">
                    </SpielerComp>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import SpielerComp from "../../components/raid/SpielerComp.vue";
    import _raids from '../../services/endpoints/raids';
    import SpielerEinladenComp from "../../components/raid/SpielerEinladenComp.vue";
    import BuildFilterButtonsComp from "../../components/raid/BuildFilterButtonsComp.vue";

    export default Vue.extend({
        name: "SpielerlistePage",
        components: {BuildFilterButtonsComp, SpielerEinladenComp, SpielerComp},
        data: () => ({
            filter: '',
            users: [] as any[],
        }),
        computed: {
            raid: function(): any {
                return this.$store.getters.raid;
            },
            showSpielerEinladen: function(): boolean {
                return this.$store.getters.raidRole > 0;
            }
        },
        methods: {
            kick: async function(user: any): Promise<void> {
                this.users = await _raids.kickPlayer(this.raid.id, user.id);
            },
            setFilter: function(filter: any): void {
                this.filter = filter;
            }
        },
        created: async function(): Promise<void> {
            if (this.raid) {
                this.users = await _raids.listPlayers(this.raid.id);
            }
        }
    })
</script>

<style scoped>

</style>