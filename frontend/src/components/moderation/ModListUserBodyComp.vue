<template>
    <div>
        <div v-if="hasDiscord">
            <div class="headline heading">Discord</div>
            <ModListUserBodyRolesComp
                    v-bind:roles="user.discord.roles"
                    class="roles"
            ></ModListUserBodyRolesComp>
            <div class="subheading textLine">Accountname: {{user.discord.username}}</div>
            <div class="subheading textLine">Nickname: {{user.discord.nickname}}</div>
            <div class="subheading textLine">Discord beigetreten: {{discordJoinDate}}</div>
        </div>
        <v-divider class="divider" v-if="hasDiscord && isInGuild"></v-divider>
        <div v-if="isInGuild">
            <div class="headline heading">Gilde</div>
            <div class="subheading textLine">Gildenrang: {{user.guild.rank}}</div>
            <div class="subheading textLine">Gilde beigetreten: {{guildJoinDate}}</div>
        </div>
        <v-btn class="openProfileButton" @click="openLink" round>Profil öffnen</v-btn>
    </div>
</template>

<script>
    import ModListUserBodyRolesComp from "./ModListUserBodyRolesComp";
    export default {
        name: "ModListUserBodyComp",
        components: {ModListUserBodyRolesComp},
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
            }
        },
        methods: {
            openLink: function() {
                this.$router.push(`/profil/${this.user.id}`);
            },
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
        margin-bottom: 10px;
    }

    .divider {
        margin: 10px 0;
    }
</style>