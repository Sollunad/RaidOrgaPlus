<template>
    <div>
        <div v-if="user.role > 0">
            Moderation!
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModerationPage",
        props: ['user']
    }
</script>

<style scoped>

</style>