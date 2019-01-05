<template>
    <TerminComp
        v-bind:terminId="terminId">
    </TerminComp>
</template>

<script>
    import TerminComp from "../components/aufstellung/TerminComp";
    export default {
        name: "AufstellungPage",
        components: {TerminComp},
        props: ['terminId'],
        asyncComputed: {
            aufstellung: function(){
                if (this.terminId === 0) window.location.href = '/#/raids';
            }
        }
    }
</script>

<style scoped>

</style>