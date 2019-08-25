<template>
    <div>
        <v-list-tile avatar>
            <v-list-tile-avatar @click="openProfile">
                <img :src="avatarLink"/>
            </v-list-tile-avatar>
            <v-list-tile-content @click="openProfile">
                <v-list-tile-title v-text="spieler.name"></v-list-tile-title>
                <v-list-tile-sub-title v-text="spieler.accname"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action @click="changePlayerRole">
                <v-btn icon>
                    <v-icon>{{promoteDemoteIcon}}</v-icon>
                </v-btn>
            </v-list-tile-action>
            <v-list-tile-action @click="kick">
                <v-btn icon>
                    <v-icon color="red">clear</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </div>
</template>

<script>
    import _icons from '../../services/icons';
    import _moderation from '../../services/endpoints/moderation';

    export default {
        name: "ModRaidSpielerListEntryComp",
        props: ['spieler', 'raid'],
        computed: {
            avatarLink: function() {
                if (this.spieler.discord) {
                    return this.spieler.discord.avatar;
                } else {
                    return _icons.miscIcon('raid');
                }
            },
            promoteDemoteIcon: function() {
                if (this.spieler.role === 2) {
                    return 'star';
                } else {
                    return 'star_border';
                }
            }
        },
        methods: {
            openProfile: function() {
                this.$router.push(`/profil/${this.spieler.id}`);
            },
            changePlayerRole: async function() {
                const role = this.spieler.role === 2? 0 : 2;
                await _moderation.setPlayerRole(this.raid.id, this.spieler.id, role);
                this.$emit('refresh');
            },
            kick: async function() {
                await _moderation.removeSpieler(this.raid.id, this.spieler.id);
                this.$emit('refresh');
            }
        }
    }
</script>

<style scoped>

</style>