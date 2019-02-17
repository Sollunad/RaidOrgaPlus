<template>
    <div>
        <v-dialog
                v-model="openComputed"
                max-width="290"
        >
            <v-card>
                <div class="container">
                    <v-autocomplete
                            v-model="ersatz"
                            :items="invitablePlayers"
                            :filter="customFilter"
                            color="white"
                            label="Ersatzspieler"
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
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import _termine from '../../services/endpoints/termine';
    import _raids from '../../services/endpoints/raids';
    import NameComp from "../menu/NameComp";

    export default {
        name: "ErsatzDialogComp",
        components: {NameComp},
        props: ['raid', 'termin', 'open'],
        data: () => ({
            ersatz: null,
            invitablePlayers: [],
        }),
        computed: {
            openComputed: {
                get: function() {
                    return this.open;
                },
                set: function() {
                    this.$emit('close');
                }
            }
        },
        methods: {
            customFilter: function (item, queryText) {
                const name = item.name.toLowerCase();
                const accname = item.accname.toLowerCase();
                const searchText = queryText.toLowerCase();

                return name.indexOf(searchText) > -1 ||
                    accname.indexOf(searchText) > -1
            },
            emitErsatz: function() {
                const ersatzspieler = this.invitablePlayers.filter(p => this.ersatz.includes(p.id));
                this.$emit('setErsatz', ersatzspieler);
            }
        },
        watch: {
            ersatz: async function (newValue, oldValue) {
                if (oldValue === null) return;
                const invitedPlayer = newValue.filter(player => !oldValue.includes(player))[0];
                const deletedPlayer = oldValue.filter(player => !newValue.includes(player))[0];
                if (invitedPlayer) {
                    await _termine.addErsatz(this.termin.id, invitedPlayer);
                } else if (deletedPlayer) {
                    await _termine.deleteErsatz(this.termin.id, deletedPlayer);
                }
                this.emitErsatz();
            }
        },
        created: async function() {
            this.ersatz = (await _termine.getErsatz(this.termin.id)).map(p => p.id);
            this.invitablePlayers = await _raids.invitablePlayers(this.raid.id);
            this.emitErsatz();
        },
    }
</script>

<style scoped>

</style>