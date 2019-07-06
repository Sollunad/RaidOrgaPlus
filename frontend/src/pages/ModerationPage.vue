<template>
    <div class="moderation" v-if="user.role > 0">
        <ModUserListComp></ModUserListComp>
    </div>
</template>

<script>
    import ModUserListComp from "../components/moderation/ModUserListComp";
    export default {
        name: "ModerationPage",
        components: {ModUserListComp},
        props: ['user']
    }
</script>

<style scoped>
    .moderation {
        margin: 3%;
    }
</style>