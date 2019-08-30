<template>
    <v-dialog width="fit-content" v-model="open">
        <v-btn color="success" slot="activator">
            Spieler hinzufügen
        </v-btn>
        <div class="container">
            <v-list two-line subheader>
                <v-list-item v-for="spieler in invitablePlayers" :key="spieler.id" @click="add(spieler)">
                    <v-list-item-content>
                        <v-list-item-title v-text="spieler.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="spieler.accname"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
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