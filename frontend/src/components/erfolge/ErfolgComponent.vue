<template>
    <div class="erfolg"
        v-bind:class="{'done': isDone}">
        <v-avatar v-if="encIcon" size="24" class="icon">
            <img :src="encIcon">
        </v-avatar>
        <v-tooltip top>
            <template v-slot:activator="{on}">
                <v-avatar v-if="conditionIcon" size="24" class="icon" v-on="on">
                    <img :src="conditionIcon">
                </v-avatar>
            </template>
            {{reqText}}
        </v-tooltip>
        <div class="name subheading">{{achievement.name}}</div>
        <div class="req">{{achievement.req}}</div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "ErfolgComponent",
        props: ['achievement', 'allDone'],
        computed: {
            isDone: function(): boolean {
                return this.allDone && this.allDone.indexOf(this.achievement.id) !== -1;
            },
            encIcon: function(): string | null {
                if (this.achievement.boss) {
                    return _icons.encIcon(this.achievement.boss);
                } else {
                    return null;
                }
            },
            conditionIcon: function(): string | null {
                const condition = this.achievement.condition;
                if (condition === 'group') {
                    return _icons.miscIcon('contacts');
                } else if (condition === 'cm') {
                    return _icons.miscIcon('cm');
                } else if (condition === 'meta') {
                    return _icons.miscIcon('meta');
                } else if (condition === 'self') {
                    return _icons.miscIcon('achievement');
                } else {
                    return null;
                }
            },
            reqText: function(): string | null {
                const condition = this.achievement.condition;
                if (condition === 'group') {
                    return 'Erfolg muss als Gruppe erledigt werden';
                } else if (condition === 'cm') {
                    return 'Challenge Mote';
                } else if (condition === 'meta') {
                    return 'Meta-Erfolg';
                } else if (condition === 'self') {
                    return 'Bonus-Erfolg'
                } else {
                    return null;
                }
            }
        },
        watch: {
            allDone: function (): void {
                if (this.isDone) {
                    this.$emit('countDone');
                }
            }
        },
    })
</script>

<style scoped>
    .erfolg {
        background-color: #445570;
        height: 100%;
        border-radius: 5px;
        padding: 5px;
    }

    .done {
        background-color: #148540;
    }

    .icon {
        float: right;
    }

    .name {
        text-align: center;
        margin-bottom: 5px;
    }
</style>