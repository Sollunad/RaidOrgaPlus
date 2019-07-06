<template>
    <div class="form">
        <LoginRegisterComp></LoginRegisterComp>
    </div>
</template>

<script>
    import LoginRegisterComp from '../components/einstellungen/LoginRegisterComp';

    export default {
        name: "LoginPage",
        components: {LoginRegisterComp},
        data: () => ({
        })
    }
</script>

<style scoped>
    .form {
        margin: 5%;
    }
</style>