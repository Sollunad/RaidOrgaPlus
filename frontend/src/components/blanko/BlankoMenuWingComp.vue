<template>
    <v-menu>
        <v-btn slot="activator" class="button">
            {{ buttonText }}
        </v-btn>
        <v-list>
            <v-list-tile
                    v-for="wing in wings"
                    :key="wing.id"
                    @click="pick(wing)">
                <v-list-tile-title>{{ tileText(wing) }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>
    import _gamedata from '../../services/endpoints/gamedata';

    export default {
        name: "BlankoMenuWingComp",
        props: ['currentWing'],
        data: () => ({
            wings: [],
        }),
        computed: {
              buttonText: function() {
                  if (this.currentWing === 0) return 'Wing auswählen';
                  else return `Wing ${this.currentWing}`;
              }
        },
        methods: {
            pick: function(wing) {
                this.$emit('pick', wing);
            },
            tileText: function(wing) {
                if (wing.id === 0) return 'Alles anzeigen';
                else return `Wing ${wing.id}`;
            }
        },
        created: async function() {
            const wings = await _gamedata.getWings();
            const showAll = {id: 0};
            this.wings = [showAll].concat(wings);
        }
    }
</script>

<style scoped>

</style>