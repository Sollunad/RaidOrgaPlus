<template>
    <RaidEinstellungenComp
        v-if="role === 2"
    ></RaidEinstellungenComp>
</template>

<script>
    import RaidEinstellungenComp from "../components/raid/RaidEinstellungenComp";
    export default {
        name: "RaidEinstellungenPage",
        components: {RaidEinstellungenComp},
        props: ['raid', 'role']
    }
</script>

<style scoped>

</style>