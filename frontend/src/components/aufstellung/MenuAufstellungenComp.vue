<template>
    <div class="container">
        <p class="subtitle-1 copyFromText">Kopieren von:</p>
        <v-avatar
                v-for="(pickableAufstellung) in filtered"
                :key="pickableAufstellung.id"
                @click="pick(pickableAufstellung)"
                class="avatar"
        >
            <img :src="avatar(pickableAufstellung)">
        </v-avatar>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "MenuAufstellungenComp",
        props: ['aufstellung'],
        computed: {
            filtered: function(): any {
                return this.$store.getters.aufstellungen.filter((a: any) => a.id !== this.aufstellung.id);
            }
        },
        methods: {
            pick: async function(aufstellung: any): Promise<void> {
                await _aufstellungen.copyElements(aufstellung.id, this.aufstellung.id);
                await this.$store.dispatch('refresh');
                await this.$store.dispatch('wsSendRefresh');
                this.$emit('stopCopy');
            },
            avatar: function(aufstellung: any): string {
                return _icons.encIcon(aufstellung.abbr);
            }
        },
        created: function() {

        }
    })
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