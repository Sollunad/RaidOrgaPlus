<template>
    <div>
        <v-list-item>
            <v-list-item-avatar @click="openProfile">
                <img :src="avatarLink"/>
            </v-list-item-avatar>
            <v-list-item-content @click="openProfile">
                <v-list-item-title v-text="spieler.name"></v-list-item-title>
                <v-list-item-subtitle v-text="spieler.accname"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action @click="changePlayerRole">
                <v-btn icon>
                    <v-icon>{{promoteDemoteIcon}}</v-icon>
                </v-btn>
            </v-list-item-action>
            <v-list-item-action @click="kick">
                <v-btn icon>
                    <v-icon color="red">clear</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _icons from '../../services/icons';
    import _moderation from '../../services/endpoints/moderation';

    export default Vue.extend({
        name: "ModRaidSpielerListEntryComp",
        props: ['spieler', 'raid'],
        computed: {
            avatarLink: function(): string {
                if (this.spieler.discord) {
                    return this.spieler.discord.avatar;
                } else {
                    return _icons.miscIcon('raid');
                }
            },
            promoteDemoteIcon: function(): string {
                if (this.spieler.role === 2) {
                    return 'star';
                } else {
                    return 'star_border';
                }
            }
        },
        methods: {
            openProfile: function(): void {
                this.$router.push(`/profil/${this.spieler.id}`);
            },
            changePlayerRole: async function(): Promise<void> {
                const role = this.spieler.role === 2? 0 : 2;
                await _moderation.setPlayerRole(this.raid.id, this.spieler.id, role);
                this.$emit('refresh');
            },
            kick: async function(): Promise<void> {
                await _moderation.removeSpieler(this.raid.id, this.spieler.id);
                this.$emit('refresh');
            }
        }
    })
</script>

<style scoped>

</style>