<template>
    <div>
        <div v-if="!editOpen">
            <span class="name">{{anmeldung.name}}</span>
            <v-icon :color="anmeldungColor(anmeldung.type)" class="icon" @click="clickIcon" v-if="editAllowed">{{anmeldungIcon(anmeldung.type)}}</v-icon>
            <v-icon :color="anmeldungColor(anmeldung.type)" class="icon" v-else>{{anmeldungIcon(anmeldung.type)}}</v-icon>
        </div>
        <div v-else>
            <AnmeldungComp
                v-on:anmelden="anmelden">
            </AnmeldungComp>
        </div>
    </div>
</template>

<script>
    import AnmeldungComp from "./AnmeldungComp";
    import _termine from '../../services/endpoints/termine';

    export default {
        name: "ListAnmeldungEintragComp",
        components: {AnmeldungComp},
        props: ['anmeldung', 'role', 'termin'],
        data: () => ({
            editOpen: false
        }),
        computed: {
            editAllowed: function() {
                return this.role > 0;
            }
        },
        methods: {
            anmeldungIcon: function(type) {
                const icons = ['check_circle', 'check_circle_outline', 'cancel', 'help'];
                return icons[type];
            },
            anmeldungColor: function(type) {
                const colors = ['green', 'yellow', 'red', 'grey'];
                return colors[type];
            },
            clickIcon: function() {
                this.editOpen = true;
            },
            anmelden: async function(type) {
                this.editOpen = false;
                await _termine.anmeldenLead(this.anmeldung.id, this.termin.id, type);
                this.$emit('refresh');
            }
        }
    }
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
