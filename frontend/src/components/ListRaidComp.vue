<template>
        <div>
            <v-list-tile avatar @click="saveId()" :to="'/raid'">
                <v-list-tile-avatar v-if="raid.icon">
                    <img :src="raid.icon">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-html="raid.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="role"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon :to="'/raid/termine'">
                        <v-icon>check_circle</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </div>
</template>

<script>
    export default {
        name: "ListRaidComp",
        props: ['raid'],
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
            saveId: function() {
                localStorage.raidId = this.raid.id;
            }
        }
    }
</script>

<style scoped>

</style>