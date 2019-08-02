<template>
    <div>
        <div class="subheading textLine"><span class="font-weight-bold">Zuletzt online:</span> {{lastActive}}</div>
        <div class="subheading textLine"><span class="font-weight-bold">Letzte Raid-Anmeldung:</span> {{lastTermin}}</div>
        <div v-if="hasDiscord">
            <div class="headline heading">Discord</div>
            <ModListUserBodyRolesComp
                    v-bind:roles="user.discord.roles"
                    class="roles"
            ></ModListUserBodyRolesComp>
            <div class="subheading textLine"><span class="font-weight-bold">Accountname:</span> {{user.discord.username}}</div>
            <div class="subheading textLine"><span class="font-weight-bold">Nickname:</span> {{user.discord.nickname}}</div>
            <div class="subheading textLine"><span class="font-weight-bold">Discord beigetreten:</span> {{discordJoinDate}}</div>
        </div>
        <v-divider class="divider" v-if="hasDiscord && isInGuild"></v-divider>
        <div v-if="isInGuild">
            <div class="headline heading">
                Gilde
            </div>
            <div class="subheading textLine"><span class="font-weight-bold">Gildenrang:</span> {{user.guild.rank}}</div>
            <div class="subheading textLine"><span class="font-weight-bold">Gilde beigetreten:</span> {{guildJoinDate}}</div>
        </div>
        <v-btn class="openProfileButton" @click="openLink" round>Profil öffnen</v-btn>
        <v-dialog width="600" v-if="isInGuild">
            <v-btn class="openProfileButton" slot="activator" round>Gildenhistorie</v-btn>
            <ModListUserGuildLogComp :log="user.guildLog"></ModListUserGuildLogComp>
        </v-dialog>
    </div>
</template>

<script>
    import ModListUserBodyRolesComp from "./ModListUserBodyRolesComp";
    import ModListUserGuildLogComp from "./ModListUserGuildLogComp";
    export default {
        name: "ModListUserBodyComp",
        components: {ModListUserGuildLogComp, ModListUserBodyRolesComp},
        props: ['user'],
        computed: {
            hasDiscord: function() {
                return !!this.user.discord;
            },
            isInGuild: function() {
                return !!this.user.guild;
            },
            discordJoinDate: function() {
                if (this.hasDiscord) {
                    const date = new Date(this.user.discord.joined);
                    const dateOptions = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
                    return date.toLocaleDateString('de-DE', dateOptions);
                } else {
                    return '';
                }
            },
            guildJoinDate: function() {
                if (this.isInGuild) {
                    const date = new Date(this.user.guild.joined);
                    const dateOptions = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
                    return date.toLocaleDateString('de-DE', dateOptions);
                } else {
                    return '';
                }
            },
            lastActive: function() {
                if (!this.user.lastActive) return 'Keine Aufzeichnung';
                const date = new Date(this.user.lastActive);
                const diff = new Date() - date;
                const minutes = Math.ceil(diff / (1000 * 60));
                if (minutes === 1) return 'gerade eben';
                else if (minutes < 60) return `vor ${minutes} Minuten`;
                const hours = Math.floor(minutes / 60);
                if (hours === 1) return 'vor 1 Stunde';
                else if (hours < 24) return `vor ${hours} Stunden`;
                const days = Math.floor(hours / 24);
                if (days === 1) return 'vor 1 Tag';
                else return `vor ${days} Tagen`;
            },
            lastTermin: function() {
                if (this.user.lastTermin) {
                    const date = new Date(this.user.lastTermin);
                    const dateOptions = {day: '2-digit', month: '2-digit', year: 'numeric'};
                    return date.toLocaleDateString('de-DE', dateOptions);
                } else {
                    return 'Nie'
                }
            }
        },
        methods: {
            openLink: function() {
                this.$router.push(`/profil/${this.user.id}`);
            }
        }
    }
</script>

<style scoped>
    .roles {
        margin: 0 0 10px 5px;
    }

    .textLine {
        margin: 5px 0 0 9px;
    }

    .openProfileButton {
        margin-top: 15px;
    }

    .heading {
        margin: 10px 0;
    }

    .divider {
        margin: 10px 0;
    }
</style>