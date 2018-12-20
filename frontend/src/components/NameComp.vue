<template>
    <p @mouseenter="name = user.accountname"
       @mouseleave="name = user.name">{{ name }}</p>
</template>

<script>
    export default {
        name: "NameComp",
        props: ['user'],
        data: function() {
            return {
                name: this.user.name
            }
        }
    }
</script>

<style scoped>

</style>