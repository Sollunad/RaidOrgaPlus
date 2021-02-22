<template>
    <span   @mouseenter="entered = true"
            @mouseleave="entered = false"
            @contextmenu.prevent="$emit('rightclick')"
            @click="openProfile">
        {{ showName }}
    </span>
</template>

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "NameComp",
        props: ['user', 'truncate', 'clickable'],
        data: () => ({
            entered: false,
        }),
        computed: {
            showName: function(): any {
                if (this.entered) {
                    if (this.truncate) {
                        const baseName = this.user.accname.split('.')[0];
                        if (baseName.length > 15) {
                            return `${baseName.slice(0,12)}...`;
                        } else {
                            return baseName;
                        }
                    } else {
                        return this.user.accname;
                    }
                } else {
                    return this.user.name;
                }

            }
        },
        methods: {
            openProfile: function(): void {
                if (this.user.id > 1 && this.clickable) this.$router.push(`/profil/${this.user.id}`);
            }
        }
    })
</script>

<style scoped>

</style>