<template>
    <div class="profile">
        <ProfileAPIKeyComp
            v-bind:user="user"></ProfileAPIKeyComp>
    </div>
</template>

<script>
    //TODO: Anzeigenamen ändern
    //TODO: Builds ankreuzen
    import ProfileAPIKeyComp from "../components/ProfileAPIKeyComp";
    export default {
        name: "ProfilPage",
        components: {ProfileAPIKeyComp},
        props: ['user']
    }
</script>

<style scoped>
    .profile {
        margin: 5%;
    }
</style>