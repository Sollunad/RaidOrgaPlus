<template>
        <div>
            <v-list-tile avatar @click="saveRaid">
                <v-list-tile-avatar v-if="raid.icon">
                    <img :src="raid.icon">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{raid.name}}</v-list-tile-title>
                    <v-list-tile-sub-title>Rolle: {{role}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon>
                        <v-icon>{{icon}}</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </div>
</template>

<script>


    export default {
        name: "ListRaidComp",
        props: ['raid', 'user', 'anmeldung'],
        computed: {
            role: function() {
                switch(this.raid.role) {
                    case 0: return "Spieler";
                    case 1: return "Lieutenant";
                    case 2: return "Raidleiter";
                    default: return "";
                }
            },
            icon: function() {
                if (this.anmeldung) {
                    const icons = ['check_circle', 'check_circle_outline', 'cancel', 'warning'];
                    return icons.slice(this.anmeldung.type)[0];
                } else {
                    return '';
                }
            }
        },
        methods: {
            saveRaid: function() {
                this.$emit('saveRaid', this.raid);
            }
        }
    }
</script>

<style scoped>

</style>