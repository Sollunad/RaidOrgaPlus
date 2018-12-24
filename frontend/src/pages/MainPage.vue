<template>
    <router-view v-bind:user="user"></router-view>
</template>

<script>
    export default {
        name: "MainPage",
        props: ['user']
    }
</script>

<style scoped>

</style>