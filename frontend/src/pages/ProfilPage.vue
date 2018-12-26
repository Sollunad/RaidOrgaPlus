<template>
    <div class="profile">
        <v-btn>
            Deine Builds
        </v-btn>
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
    //TODO: Anzeigenamen ändern
    //TODO: Builds ankreuzen
    import ProfileAPIKeyComp from "../components/ProfileAPIKeyComp";
    import ProfileNameComp from "../components/ProfileNameComp";
    export default {
        name: "ProfilPage",
        components: {ProfileNameComp, ProfileAPIKeyComp},
        props: ['user']
    }
</script>

<style scoped>
    .profile {
        margin: 5%;
    }
</style>