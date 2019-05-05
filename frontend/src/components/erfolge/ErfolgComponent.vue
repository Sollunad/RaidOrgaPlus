<template>
    <div class="erfolg"
        v-bind:class="{'done': isDone}">
        <div class="name subheading">{{achievement.name}}</div>
        <div class="req">{{achievement.req}}</div>
    </div>
</template>

<script>
    export default {
        name: "ErfolgComponent",
        props: ['achievement', 'allDone'],
        computed: {
            isDone: function() {
                return this.allDone && this.allDone.indexOf(this.achievement.id) !== -1;
            }
        }
    }
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

    .name {
        text-align: center;
        margin-bottom: 5px;
    }
</style>