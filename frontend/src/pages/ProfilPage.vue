<template>
    <div class="profile">
        <BuildsComp
                v-bind:user="user">
        </BuildsComp>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <ProfileNameComp
                v-bind:user="user"
                v-on:changeName="changeName">
        </ProfileNameComp>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <ProfileAPIKeyComp
            v-bind:user="user">
        </ProfileAPIKeyComp>
    </div>
</template>

<script>
    import ProfileAPIKeyComp from "../components/profile/ProfileAPIKeyComp";
    import ProfileNameComp from "../components/profile/ProfileNameComp";
    import BuildsComp from "../components/profile/BuildsComp";

    export default {
        name: "ProfilPage",
        components: {BuildsComp, ProfileNameComp, ProfileAPIKeyComp},
        props: ['user'],
        data: () => ({
            buildDialog: false
        }),
        methods: {
            changeName: function(name) {
                this.$emit('changeName', name);
            }
        }
    }
</script>

<style scoped>
    .profile {
        margin: 5%;
    }
</style>