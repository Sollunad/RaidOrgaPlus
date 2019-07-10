<template>
    <div>
        <ModListUserBodyRoleComp v-for="role in roles" :key="role.id" v-bind:role="role"></ModListUserBodyRoleComp>
    </div>
</template>

<script>
    import ModListUserBodyRoleComp from "./ModListUserBodyRoleComp";
    export default {
        name: "ModListUserBodyRolesComp",
        components: {ModListUserBodyRoleComp},
        props: ['roles']
    }
</script>

<style scoped>

</style>