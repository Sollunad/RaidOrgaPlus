<template>
    <div class="form">
        <NeuerTerminComp
                v-if="role > 0"
                v-bind:raid="raid">
        </NeuerTerminComp>
    </div>
</template>

<script>
    import NeuerTerminComp from "../components/raid/NeuerTerminComp";
    export default {
        name: "NeuerTerminPage",
        props: ['raid', 'role'],
        components: {NeuerTerminComp}
    }
</script>

<style scoped>
    .form {
        margin: 5%;
    }
</style>