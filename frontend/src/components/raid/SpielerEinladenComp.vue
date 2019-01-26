<template>
    <div>
        <v-dialog width="fit-content">
            <v-btn color="success" slot="activator">
                Spieler einladen
            </v-btn>
            <div class="container">
                <v-autocomplete
                        v-model="invited"
                        :disabled="disabled"
                        :items="invitablePlayers"
                        color="white"
                        label="Eingeladene Spieler"
                        item-text="name"
                        item-value="id"
                        multiple
                        chips
                        deletable-chips
                        hide-selected
                ></v-autocomplete>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    import _raids from '../../services/endpoints/raids';

    export default {
        name: "SpielerEinladenComp",
        props: ['raid'],
        data: () => ({
            disabled: false,
            invited: null,
            invitablePlayers: [{id: 5, name: 'Daniel'}, {id: 6, name: 'Lili'}, {id: 7, name: 'Nico'}],
        }),
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
</style>