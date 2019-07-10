<template>
    <v-chip :text-color="color" >{{role.name}}</v-chip>
</template>

<script>
    export default {
        name: "ModListUserBodyRoleComp",
        props: ['role'],
        computed: {
            color: function() {
                if (this.role.color === '#000000') {
                    return '#ffffff';
                } else {
                    return this.role.color;
                }
            }
        }
    }
</script>

<style scoped>

</style>