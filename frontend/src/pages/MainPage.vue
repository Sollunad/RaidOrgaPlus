<template>
    <router-view class="page"/>
</template>

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "MainPage",
    })
</script>

<style scoped>
    @media only screen and (min-width: 600px) {
        .page {
            margin: 1% 2%;
        }
    }
</style>