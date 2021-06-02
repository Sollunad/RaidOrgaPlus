<template>
    <v-dialog width="unset" v-model="open" class="addButton">
        <template v-slot:activator="{on}">
            <v-btn color="success" v-on="on" class="addButton">
                Spieler hinzufügen
            </v-btn>
        </template>
        <div class="container">
            <v-text-field
                    outline
                    class="suche"
                    label="Suche nach Spielern"
                    prepend-inner-icon="search"
                    v-model="filterText"
            ></v-text-field>
            <v-list two-line subheader>
                <v-list-item v-for="spieler in filteredPlayers" :key="spieler.id" @click="add(spieler)">
                    <v-list-item-content>
                        <v-list-item-title v-text="spieler.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="spieler.accname"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
    </v-dialog>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
    import _moderation from '../../services/endpoints/moderation';
	import { ModRaid } from 'models/Raid';
	import { Spieler } from 'models/Spieler';

    export default Vue.extend({
        name: "ModRaidSpielerEinladenComp",
        // props: ['raid'],
		props: {
			raid: Object as PropType<ModRaid>
		},
        data: () => ({
            open: false,
            invitablePlayers: [] as Spieler[],
            filterText: '',
        }),
        computed: {
            filteredPlayers: function(): Spieler[] {
                return this.invitablePlayers.filter(u => this.isInNameFilter(u));
            },
        },
        methods: {
            add: async function(spieler: Spieler): Promise<void> {
                await _moderation.addSpieler(this.raid.id, spieler.id, spieler.accname, this.raid.name);
                this.$emit('refresh');
            },
            refreshInvitable: async function(): Promise<void> {
                this.invitablePlayers = await _moderation.invitablePlayers(this.raid.id);
            },
            isInNameFilter: function(user: Spieler): boolean {
                const name = user.name.toLowerCase();
                const accname = user.accname.toLowerCase();
                const searchText = this.filterText.toLowerCase();

                return name.indexOf(searchText) > -1 ||
                    accname.indexOf(searchText) > -1
            },
        },
        created: async function(): Promise<void> {
            this.invitablePlayers = await _moderation.invitablePlayers(this.raid.id);
        }
    })
</script>

<style scoped>
    .container {
        background-color: #424242;
        height: 500px;
    }

    .addButton {
        margin-bottom: 10px;
    }
</style>
