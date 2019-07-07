<template>
    <div>
        <v-avatar
            v-if="user"
            :size="size"
        >
            <v-img :src="iconLink"/>
        </v-avatar>
    </div>
</template>

<script>
    import _icons from '../../services/icons';

    export default {
        name: "ProfilePictureComp",
        props: ['user', 'ownProfile', 'size'],
        computed: {
            iconLink: function() {
                if (this.user.icon) {
                    return this.user.icon;
                } else {
                    return _icons.encIcon('tbd');
                }
            }
        },
    }
</script>

<style scoped>

</style>