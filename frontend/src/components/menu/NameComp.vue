<template>
    <span @mouseenter="entered = true"
       @mouseleave="entered = false">
        {{ showName }}
    </span>
</template>

<script>
    export default {
        name: "NameComp",
        props: ['user'],
        data: () => ({
            entered: false,
        }),
        computed: {
            showName: function() {
                return this.entered? this.user.accname : this.user.name;
            }
        }
    }
</script>

<style scoped>

</style>