<template>
    <div>
        <div v-for="anmeldung in anmeldungen" v-bind:key="anmeldung.id" class="anmeldung">
            <span class="name">{{anmeldung.name}}</span>
            <v-icon :color="anmeldungColor(anmeldung.type)" class="icon">{{anmeldungIcon(anmeldung.type)}}</v-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListAnmeldungComp",
        props: ['anmeldungen'],
        methods: {
            anmeldungIcon: function(type) {
                const icons = ['check_circle', 'check_circle_outline', 'cancel', 'help'];
                return icons[type];
            },
            anmeldungColor: function(type) {
                const colors = ['green', 'yellow', 'red', 'grey'];
                return colors[type];
            },
        }
    }
</script>

<style scoped>
    .icon {
        margin-left: 2rem;
        float: right;
    }

    .name {
        font-size: 16px;
    }

    .anmeldung {
        margin-bottom: 1rem;
    }

    .anmeldung:last-child {
        margin-bottom: 0;
    }
</style>