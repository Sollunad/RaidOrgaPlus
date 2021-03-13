<template>
    <v-chip :text-color="color" class="rolechip" >{{role.name}}</v-chip>
</template>

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "ModListUserBodyRoleComp",
        props: ['role'],
        computed: {
            color: function(): string {
                if (this.role.color === '#000000') {
                    return '#ffffff';
                } else {
                    return this.role.color;
                }
            }
        }
    })
</script>

<style scoped>
    .rolechip {
        margin-right: 5px;
    }
</style>