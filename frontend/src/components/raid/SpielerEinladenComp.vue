<template>
    <div>
        <v-dialog width="fit-content" class="einladenButton">
            <v-btn color="success" slot="activator">
                Spieler einladen
            </v-btn>
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

<script>
    import _raids from '../../services/endpoints/raids';
    import NameComp from "../menu/NameComp";

    export default {
        name: "SpielerEinladenComp",
        components: {NameComp},
        props: ['raid'],
        data: () => ({
            disabled: false,
            invited: null,
            invitablePlayers: [],
        }),
        methods: {
            customFilter: function (item, queryText) {
                const name = item.name.toLowerCase();
                const accname = item.accname.toLowerCase();
                const searchText = queryText.toLowerCase();

                return name.indexOf(searchText) > -1 ||
                    accname.indexOf(searchText) > -1
            }
        },
        watch: {
            invited: async function (newValue, oldValue) {
                if (oldValue === null) return;
                const invitedPlayer = newValue.filter(player => !oldValue.includes(player))[0];
                const deletedPlayer = oldValue.filter(player => !newValue.includes(player))[0];
                if (invitedPlayer) {
                    await _raids.invitePlayer(this.raid.id, invitedPlayer);
                } else if (deletedPlayer) {
                    await _raids.deleteInviteAsLead(this.raid.id, deletedPlayer);
                }
            }
        },
        created: async function() {
            this.invited = await _raids.pendingInvitesForRaid(this.raid.id);
            this.invitablePlayers = await _raids.invitablePlayers(this.raid.id);

        }
    }
</script>

<style scoped>
    .container {
        background-color: #444444;
        padding: 10px;
    }

    @media only screen and (max-width: 599px) {
        .einladenButton {
            margin: 5px 0 0 5px;
        }
    }
</style>