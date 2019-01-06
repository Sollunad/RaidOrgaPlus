<template>
    <FeedbackComp class="form"
        v-bind:user="user"></FeedbackComp>
</template>

<script>
    import FeedbackComp from "../components/menu/FeedbackComp";
    export default {
        name: "FeedbackPage",
        components: {FeedbackComp},
        props: ['user']
    }
</script>

<style scoped>
    .form {
        margin: 1%;
    }
</style>