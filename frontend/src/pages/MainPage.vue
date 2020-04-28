<template>
    <router-view class="page"/>
</template>

<script>
    export default {
        name: "MainPage",
    }
</script>

<style scoped>
    @media only screen and (min-width: 600px) {
        .page {
            margin: 1% 2%;
        }
    }
</style>