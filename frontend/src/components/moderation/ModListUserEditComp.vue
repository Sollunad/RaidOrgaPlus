<template>
    <div class="bg">
        <ModListUserEditCommentComp
            v-bind:user="user">
        </ModListUserEditCommentComp>
		<br />
		<v-divider class="divider" width="98%" />
		<ModListUserEditRoleComp v-bind:user="user" />
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import ModListUserEditCommentComp from "./ModListUserEditCommentComp.vue";
    import ModListUserEditRoleComp from "./ModListUserEditRoleComp.vue";

    export default Vue.extend({
        name: "ModListUserEditComp",
        components: {ModListUserEditCommentComp, ModListUserEditRoleComp},
        props: ['user']
    })
</script>

<style scoped lang="scss">
    .bg {
        background-color: $dialogBox;
        padding: 0 0 20px 10px;
    }

	.divider {
        margin-top: 25px;
    }
</style>
