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
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <ProfileEmailComp
            v-bind:user="user">
        </ProfileEmailComp>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <ProfilePasswordComp
            v-bind:user="user">
        </ProfilePasswordComp>
    </div>
</template>

<script>
    import ProfileAPIKeyComp from "../components/profile/ProfileAPIKeyComp";
    import ProfileNameComp from "../components/profile/ProfileNameComp";
    import BuildsComp from "../components/profile/BuildsComp";
    import ProfileEmailComp from "../components/profile/ProfileEmailComp";
    import ProfilePasswordComp from "../components/profile/ProfilePasswordComp";

    export default {
        name: "ProfilPage",
        components: {ProfilePasswordComp, ProfileEmailComp, BuildsComp, ProfileNameComp, ProfileAPIKeyComp},
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