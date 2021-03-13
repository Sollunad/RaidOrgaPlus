<template>
    <div>
        <ModListUserBodyRoleComp v-for="role in roles" :key="role.id" v-bind:role="role"></ModListUserBodyRoleComp>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import ModListUserBodyRoleComp from "./ModListUserBodyRoleComp.vue";

    export default Vue.extend({
        name: "ModListUserBodyRolesComp",
        components: {ModListUserBodyRoleComp},
        props: ['roles']
    })
</script>

<style scoped>

</style>