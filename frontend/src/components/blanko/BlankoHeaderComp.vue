<template>
    <div class="header">
        <v-avatar class="avatar">
            <img :src="icon()">
        </v-avatar>
        <span>{{boss.name}}</span>
        <v-menu :close-on-content-click="false" v-if="role > 0" class="button" :lazy="true">
            <v-btn flat icon v-if="role > 0" slot="activator">
                <v-icon>get_app</v-icon>
            </v-btn>
            <MenuWingComp
                    v-on:pick="copyBlanko">
            </MenuWingComp>
        </v-menu>
    </div>
</template>

<script>
    import _icons from '../../services/icons.js';
    import MenuWingComp from "../aufstellung/MenuWingComp";

    export default {
        name: "BlankoHeaderComp",
        components: {MenuWingComp},
        props: ['boss', 'role'],
        methods: {
            icon: function() {
                if (this.boss) return _icons.encIcon(this.boss.abbr);
                else return '';
            },
            copyBlanko: async function(info) {
                const boss = info[0];
                this.$emit('copyBlanko', [boss, this.boss.id]);
            }

        }
    }
</script>

<style scoped>
    .avatar {
        margin-right: 1rem;
    }

    .header {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }

    .button {
        float: right;
    }
</style>