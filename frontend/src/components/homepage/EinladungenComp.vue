<template>
    <div v-if="invites.length > 0">
        <div class="headline">Du wurdest eingeladen!</div>
        <v-layout row>
            <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-list>
                        <EinladungComp
                            v-for="raid in invites"
                            :key="raid.id"
                            v-bind:raid="raid"
                            v-on:accept="accept(raid.id)"
                            v-on:decline="decline(raid.id)">
                        </EinladungComp>
                    </v-list>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import EinladungComp from "./EinladungComp.vue";
    import _raids from '../../services/endpoints/raids';

    export default Vue.extend({
        name: "EinladungenComp",
        components: {EinladungComp},
        data: () => ({
            invites: [] as any[],
        }),
        methods: {
            accept: async function(raidId: any): Promise<void> {
                this.invites = this.invites.filter(r => r.id !== raidId);
                await _raids.acceptInvite(raidId);
            },
            decline: async function(raidId: any): Promise<void> {
                this.invites = this.invites.filter(r => r.id !== raidId);
                await _raids.deleteInviteAsSelf(raidId);
            },
        },
        created: async function(): Promise<void> {
            this.invites = await _raids.pendingInvitesForPlayer();
        }
    })
</script>

<style scoped>

</style>