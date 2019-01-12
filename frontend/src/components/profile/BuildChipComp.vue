<template>
    <v-chip
            :close="close" :color="color">
        <v-avatar class="classIcon" tile>
            <img :src="classIcon" v-if="classIcon">
        </v-avatar>
        <v-avatar class="roleIcon" tile>
            <img :src="roleIcon" v-if="roleIcon">
        </v-avatar>
    </v-chip>
</template>

<script>
    import icons from '../../services/icons';

    export default {
        name: "BuildChipComp",
        props: ['close', 'clss', 'role'],
        computed: {
            classIcon: function() {
                if (this.clss) return icons.classIcon(this.clss.abbr);
            },
            roleIcon: function() {
                if (this.role) return icons.roleIcon(this.role.abbr);
            },
            color: function() {
                if (this.clss) return this.clss.color;
            }
        },
    }
</script>

<style scoped>
    .classIcon {
        margin-left: 0;
        margin-right: 15px;
    }

    .roleIcon {
        margin-right: 0;
    }
</style>