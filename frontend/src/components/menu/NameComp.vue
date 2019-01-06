<template>
    <p @mouseenter="showName = user.accname"
       @mouseleave="showName = user.name">{{ showName }}</p>
</template>

<script>
    export default {
        name: "NameComp",
        props: ['user'],
        data: function() {
            return {
                showName: this.user.name
            }
        }
    }
</script>

<style scoped>

</style>