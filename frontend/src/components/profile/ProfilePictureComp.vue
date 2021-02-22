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

<script lang="ts">
	import Vue from 'vue';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "ProfilePictureComp",
        props: ['user', 'ownProfile', 'size'],
        computed: {
            iconLink: function(): string {
                if (this.user.discord) {
                    return this.user.discord.avatar;
                } else {
                    return _icons.miscIcon('raid');
                }
            }
        },
    })
</script>

<style scoped>

</style>