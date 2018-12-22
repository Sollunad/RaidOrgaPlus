<template>
    <div class="form">
        <LoginComp v-if="!register"></LoginComp>
        <RegisterComp v-else></RegisterComp>
        <v-checkbox
                v-model="register"
                label="Neu registrieren?"
        ></v-checkbox>
    </div>
</template>

<script>
    import LoginComp from "../components/LoginComp";
    import RegisterComp from '../components/RegisterComp';

    export default {
        name: "LoginPage",
        components: {LoginComp, RegisterComp},
        data: () => ({
            register: false
        })
    }
</script>

<style scoped>
    .form {
        margin: 5%;
    }
</style>