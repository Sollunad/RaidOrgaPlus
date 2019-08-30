<template>
    <v-list-item @click="saveRaid" class="listRaid">
        <v-list-item-avatar v-if="raid.icon">
            <img :src="raid.icon">
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{raid.name}}</v-list-item-title>
            <v-list-item-subtitle>Rolle: {{role}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn icon>
                <v-icon>{{icon}}</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
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
    .listRaid {
        margin: 0 10px;
    }
</style>