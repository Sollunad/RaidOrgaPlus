<template>
    <div class="form">
        <LoginRegisterComp />
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import LoginRegisterComp from '../components/einstellungen/LoginRegisterComp.vue';

    export default Vue.extend({
        name: "LoginPage",
        components: {LoginRegisterComp},
        data: () => ({
        })
    })
</script>

<style scoped>
    .form {
        margin: 3%;
    }
</style>