<template>
    <div>
        <div v-if="!editOpen">
            <span class="name">{{anmeldung.name}}</span>
            <v-icon :color="anmeldungColor(anmeldung.type)" class="icon" @click="clickIcon" v-if="editAllowed">{{anmeldungIcon(anmeldung.type)}}</v-icon>
            <v-icon :color="anmeldungColor(anmeldung.type)" class="icon" v-else>{{anmeldungIcon(anmeldung.type)}}</v-icon>
        </div>
        <div v-else>
            <AnmeldungComp
                :foreignAnmeldung="anmeldung"
                v-on:anmelden="anmelden">
            </AnmeldungComp>
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import AnmeldungComp from "./AnmeldungComp.vue";
    import _termine from '../../services/endpoints/termine';

    export default Vue.extend({
        name: "ListAnmeldungEintragComp",
        components: {AnmeldungComp},
        props: ['anmeldung'],
        data: () => ({
            editOpen: false
        }),
        computed: {
            editAllowed: function(): boolean {
                return this.$store.getters.raidRole > 0;
            },
            termin: function(): any {
                return this.$store.getters.termin;
            }
        },
        methods: {
            anmeldungIcon: function(type: number): string {
                const icons = ['check_circle', 'check_circle_outline', 'cancel', 'help'];
                return icons[type];
            },
            anmeldungColor: function(type: number): string {
                const colors = ['green', 'yellow', 'red', 'grey'];
                return colors[type];
            },
            clickIcon: function(): void {
                this.editOpen = true;
            },
            anmelden: async function(type: any): Promise<void> {
                this.editOpen = false;
                await _termine.anmeldenLead(this.anmeldung.id, this.termin.id, type);
                await this.$store.dispatch('refresh');
                await this.$store.dispatch('wsSendRefresh');
            }
        }
    })
</script>

<style scoped>
    .icon {
        margin-left: 2rem;
        margin-top: 0.2rem;
        float: right;
    }

    .name {
        font-size: 16px;
    }
</style>
