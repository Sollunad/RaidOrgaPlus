<template>
    <div>
        <p>Profil von {{ user.name }}</p>
        <p>Anzeigename ändern</p>
        <p>API-Key hinterlegen</p>
        <p>Builds ankreuzen</p>
    </div>
</template>

<script>
    export default {
        name: "ProfilPage",
        props: ['user']
    }
</script>

<style scoped>

</style>