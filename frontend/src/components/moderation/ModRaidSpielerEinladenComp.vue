<template>
    <v-dialog width="fit-content" v-model="open">
        <v-btn color="success" slot="activator">
            Spieler hinzufügen
        </v-btn>
        <div class="container">
            <v-list two-line subheader>
                <v-list-tile v-for="spieler in invitablePlayers" :key="spieler.id" @click="add(spieler)">
                    <v-list-tile-content>
                        <v-list-tile-title v-text="spieler.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-text="spieler.accname"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </div>
    </v-dialog>
</template>

<script>
    import _moderation from '../../services/endpoints/moderation';

    export default {
        name: "ModRaidSpielerEinladenComp",
        props: ['raid'],
        data: () => ({
            open: false,
            invitablePlayers: [],
        }),
        methods: {
            add: async function(spieler) {
                await _moderation.addSpieler(this.raid.id, spieler.id);
                this.$emit('refresh');
            },
            refreshInvitable: async function() {
                this.invitablePlayers = await _moderation.invitablePlayers(this.raid.id);
            }
        },
        created: async function() {
            this.invitablePlayers = await _moderation.invitablePlayers(this.raid.id);
        }
    }
</script>

<style scoped>
    .container {
        background-color: #444444;
        padding: 10px;
    }
</style>