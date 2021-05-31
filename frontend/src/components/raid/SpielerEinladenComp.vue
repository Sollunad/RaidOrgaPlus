<template>
    <div>
        <v-dialog width="unset" class="einladenButton">
            <template v-slot:activator="{on}">
                <v-btn color="success" v-on="on" class="einladenButton">
                    Spieler einladen
                </v-btn>
            </template>
            <div class="container">
                <v-autocomplete
                        v-model="invited"
                        :disabled="disabled"
                        :items="invitablePlayers"
                        :filter="customFilter"
                        color="white"
                        label="Eingeladene Spieler"
                        no-data-text="Keine Spieler vorhanden"
                        item-text="name"
                        item-value="id"
                        multiple
                        chips
                        deletable-chips
                        hide-selected
                >
                    <template slot="item" slot-scope="invitable">
                        <NameComp :user="invitable.item"></NameComp>
                    </template>
                </v-autocomplete>
            </div>
        </v-dialog>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _raids from '../../services/endpoints/raids';
    import NameComp from "../menu/NameComp.vue";

    export default Vue.extend({
        name: "SpielerEinladenComp",
        components: {NameComp},
        props: ['raid'],
        data: () => ({
            disabled: false,
            invited: [] as number[],
            invitablePlayers: [] as any[],
        }),
        methods: {
            customFilter: function (item: any, queryText: string): boolean {
                const name = item.name.toLowerCase();
                const accname = item.accname.toLowerCase();
                const searchText = queryText.toLowerCase();

                return name.indexOf(searchText) > -1 ||
                    accname.indexOf(searchText) > -1
            }
        },
        watch: {
            invited: async function (newValue: any[], oldValue: any[]): Promise<any> {
                if (oldValue === null) return;
                const invitedPlayer = newValue.find(player => !oldValue.includes(player));
                const deletedPlayer = oldValue.find(player => !newValue.includes(player));
                if (invitedPlayer) {
                    await _raids.invitePlayer(this.raid.id, invitedPlayer);
                } else if (deletedPlayer) {
                    await _raids.deleteInviteAsLead(this.raid.id, deletedPlayer);
                }
            }
        },
        created: async function(): Promise<void> {
            this.invited = await _raids.pendingInvitesForRaid(this.raid.id);
            this.invitablePlayers = await _raids.invitablePlayers(this.raid.id);

        }
    })
</script>

<style scoped>
    .container {
        background-color: #444444;
        padding: 10px;
    }

    @media only screen and (max-width: 599px) {
        .einladenButton {
            margin: 10px 0 0 5px;
        }
    }
</style>
