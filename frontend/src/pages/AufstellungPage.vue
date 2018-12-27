<template>
    <p>Aufstellung Nr. {{ terminId }}</p>
</template>

<script>
    export default {
        name: "AufstellungPage",
        props: ['terminId'],
        asyncComputed: {
            aufstellung: function(){
                if (this.terminId === 0) window.location.href = '/#/raid';
            }
        }
    }
</script>

<style scoped>

</style>