<template>
    <div class="profile">
        <v-dialog
                v-model="buildDialog"
                width="500"
        >
            <v-btn slot="activator">
                Deine Builds
            </v-btn>
            <BuildsComp
                v-bind:user="user">
            </BuildsComp>
        </v-dialog>
        <p></p>
        <v-divider></v-divider>
        <p></p>
        <ProfileNameComp
                v-bind:user="user">
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
        })
    }
</script>

<style scoped>
    .profile {
        margin: 5%;
    }
</style>