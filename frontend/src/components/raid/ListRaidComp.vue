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

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "ListRaidComp",
        props: ['raid', 'anmeldung'],
        computed: {
            role: function(): string {
                switch(this.raid.role) {
                    case 0: return "Spieler";
                    case 1: return "Lieutenant";
                    case 2: return "Raidleiter";
                    default: return "";
                }
            },
            icon: function(): string {
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
                this.$store.dispatch('openRaid', this.raid);
            }
        }
    })
</script>

<style scoped>
    .listRaid {
        margin: 0 10px;
    }
</style>