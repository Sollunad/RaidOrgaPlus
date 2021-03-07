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
	import { MyActions } from '@/models/Store/State';
	import Vue from 'vue';
    import _aufstellungen from '../../services/endpoints/aufstellungen';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "MenuAufstellungenComp",
        props: ['aufstellung'],
        computed: {
            filtered: function(): any {
                return this.$vStore.getters.aufstellungen.filter((a: any) => a.id !== this.aufstellung.id);
            }
        },
        methods: {
            pick: async function(aufstellung: any): Promise<void> {
                await _aufstellungen.copyElements(aufstellung.id, this.aufstellung.id);
                await this.$vStore.dispatch(MyActions.Refresh);
                await this.$vStore.dispatch(MyActions.WsSendRefresh);
                this.$emit('stopCopy');
            },
            avatar: function(aufstellung: any): string {
                return _icons.encIcon(aufstellung.abbr);
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
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