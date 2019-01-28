<template>
        <div>
            <v-list-tile avatar @click="saveRaid" :to="'/raid'">
                <v-list-tile-avatar v-if="raid.icon">
                    <img :src="raid.icon">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-html="raid.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="role"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon :to="'/raid/termine'">
                        <v-icon>{{icon}}</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </div>
</template>

<script>
    import _raids from '../../services/endpoints/raids';

    export default {
        name: "ListRaidComp",
        props: ['raid', 'user'],
        computed: {
            role: function() {
                switch(this.raid.role) {
                    case 0: return "Rolle: Spieler";
                    case 1: return "Rolle: Lieutenant";
                    case 2: return "Rolle: Raidleiter";
                    default: return "";
                }
            }
        },
        methods: {
            saveRaid: function() {
                this.$emit('saveRaid', this.raid);
            }
        },
        asyncComputed: {
            icon: async function() {
                if (this.user) {
                    const anmeldung = await _raids.getAnmeldungState(this.raid.id);
                    if (anmeldung === null) return 'error';
                    const icons = ['check_circle', 'check_circle_outline', 'cancel'];
                    return icons[anmeldung];
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>

</style>