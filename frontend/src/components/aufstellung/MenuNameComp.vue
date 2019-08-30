<template>
    <v-list>
        <v-list-item
                v-for="(user, index) in angemeldet"
                :key="index"
                @click="pick(user)"
        >
            <v-list-item-title>
                {{user.name}}
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: "MenuNameComp",
        props: ['termin', 'anmeldungen', 'ersatz'],
        computed: {
            angemeldet: function() {
                const lfgUser = {
                    id: 1,
                    accname: 'LFG',
                    name: 'LFG'
                };
                let angemeldet = this.anmeldungen.filter(player => player.type < 2);
                angemeldet = angemeldet.concat(this.ersatz);
                angemeldet.push(lfgUser);
                return angemeldet;
            }
        },
        methods: {
            pick: function(user) {
                this.$emit('pick', user);
            }
        }
    }
</script>

<style scoped>

</style>