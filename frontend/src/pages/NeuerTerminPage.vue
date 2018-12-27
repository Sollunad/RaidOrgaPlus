<template>
    <NeuerTerminComp
        v-if="role > 0">
    </NeuerTerminComp>
</template>

<script>
    import NeuerTerminComp from "../components/NeuerTerminComp";
    export default {
        name: "NeuerTerminPage",
        props: ['raid', 'role'],
        components: {NeuerTerminComp}
    }
</script>

<style scoped>

</style>