<template>
    <div>
        <div v-if="hasDiscord">
            <ModListUserBodyRolesComp
                    v-bind:roles="user.discord.roles"
                    class="roles"
            ></ModListUserBodyRolesComp>
            <div class="subheading textLine">Accountname: {{user.discord.username}}</div>
            <div class="subheading textLine">Nickname: {{user.discord.nickname}}</div>
            <div class="subheading textLine">Gejoined: {{joinDate}}</div>
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
            joinDate: function() {
                if (this.hasDiscord) {
                    const date = new Date(this.user.discord.joined);
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
</style>