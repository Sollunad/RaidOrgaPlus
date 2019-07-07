<template>
    <div>
        <v-avatar
            v-if="user"
            :size="size"
        >
            <v-img :src="raidIcon"/>
        </v-avatar>
    </div>
</template>

<script>
    import _icons from '../../services/icons';

    export default {
        name: "ProfilePictureComp",
        props: ['user', 'ownProfile', 'size'],
        computed: {
            raidIcon: function() {
                return _icons.encIcon('tbd');
            }
        },
    }
</script>

<style scoped>

</style>