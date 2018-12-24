<template>
    <div>
        <ProgressComp
                v-bind:user="user"
                class="progress"></ProgressComp>
    </div>
</template>

<script>
    import ProgressComp from "../components/ProgressComp";
    export default {
        name: "HomePage",
        props: ['user'],
        components: {ProgressComp}
    }
</script>

<style scoped>
    .progress {
        margin: 10px;
    }
</style>