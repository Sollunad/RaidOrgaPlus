<template>
    <span   @mouseenter="entered = true"
            @mouseleave="entered = false"
            @contextmenu.prevent="$emit('rightclick')">
        {{ showName }}
    </span>
</template>

<script>
    export default {
        name: "NameComp",
        props: ['user', 'truncate'],
        data: () => ({
            entered: false,
        }),
        computed: {
            showName: function() {
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
        }
    }
</script>

<style scoped>

</style>