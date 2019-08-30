<template>
    <div class="container">
        <p class="subtitle-1 copyFromText">Kopieren von:</p>
        <v-avatar
                v-for="(aufstellung) in filtered"
                :key="aufstellung.id"
                @click="pick(aufstellung)"
                class="avatar"
        >
            <img :src="avatar(aufstellung)">
        </v-avatar>
    </div>
</template>

<script>
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import _icons from '../../services/icons';

    export default {
        name: "MenuAufstellungenComp",
        props: ['all', 'aufstellung'],
        computed: {
            filtered: function() {
                return this.all.filter(a => a.id !== this.aufstellung.id);
            }
        },
        methods: {
            pick: async function(aufstellung) {
                await _aufstellungen.copyElements(aufstellung.id, this.aufstellung.id);
                this.$emit('refresh');
            },
            avatar: function(aufstellung) {
                return _icons.encIcon(aufstellung.abbr);
            }
        },
        created: function() {

        }
    }
</script>

<style scoped>
    .avatar {
        margin: 5px;
        cursor: pointer;
    }

    .copyFromText {
        text-align: center;
        margin: 2px 0 5px 5px;
    }

    .container {
        text-align: center;
    }
</style>