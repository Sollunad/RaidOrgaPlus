<template>
    <div class="bg">
        <ModListUserEditCommentComp
            v-bind:user="user">
        </ModListUserEditCommentComp>
    </div>
</template>

<script>
    import ModListUserEditCommentComp from "./ModListUserEditCommentComp";
    export default {
        name: "ModListUserEditComp",
        components: {ModListUserEditCommentComp},
        props: ['user']
    }
</script>

<style scoped>
    .bg {
        background-color: #444444;
        padding: 0 0 50px 10px;
    }
</style>
