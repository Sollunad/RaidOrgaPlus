<template>
    <v-chip
            :close="close" :small="small" :large="!small" :disabled="disabled" :color="color" v-model="chip" light class="chip elevation-12">
        <v-avatar class="classIcon" tile>
            <img :src="classIcon" v-if="classIcon">
        </v-avatar>
        <v-avatar class="roleIcon" tile>
            <img :src="roleIcon" v-if="roleIcon">
        </v-avatar>
        <v-avatar v-if="star" class="star" tile @click="togglePrefer">
            <v-icon :color="starColor">{{starIcon}}</v-icon>
        </v-avatar>
    </v-chip>
</template>

<script>
    import _icons from '../../services/icons';

    export default {
        name: "BuildChipComp",
        props: ['close', 'build', 'small', 'disabled', 'star', 'ownProfile'],
        data: () => ({
            chip: true,
        }),
        computed: {
            classIcon: function() {
                if (this.build && this.build.class) return _icons.classIcon(this.build.class.abbr);
                else return '';
            },
            roleIcon: function() {
                if (this.build && this.build.role) return _icons.roleIcon(this.build.role.abbr);
                else return '';
            },
            color: function() {
                if (this.build && this.build.class) return this.build.class.color;
                else return '';
            },
            starColor: function() {
                if (this.build && this.build.prefer) return 'amber darken-1';
                else return 'black';
            },
            starIcon: function() {
                if (this.build && this.build.prefer) return 'star';
                else return 'star_outline';
            }
        },
        watch: {
            chip: function(value) {
                if (!value) this.$emit('close');
            }
        },
        methods: {
            togglePrefer: function() {
                if (this.ownProfile) {
                    this.$emit('togglePrefer');
                }
            }
        }
    }
</script>

<style scoped>
    .classIcon {
        margin-left: 5px;
        margin-right: 5px;
    }

    .roleIcon {
        margin-right: 0;
    }

    .star {
        margin-left: 5px;
        margin-right: 5px;
    }

    .chip {
        padding-top: 4px;
        padding-bottom: 4px;
        margin: 5px;
    }
</style>