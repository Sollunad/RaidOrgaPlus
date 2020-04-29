<template>
    <v-list>
        <v-list-item
                v-for="(user, index) in dropdownList"
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
        computed: {
            dropdownList: function() {
                const lfgUser = {
                    id: 1,
                    accname: 'LFG',
                    name: 'LFG'
                };
                const gcgUser = {
                    id: 2,
                    accname: 'GCG',
                    name: 'GCG'
                };
                let angemeldet = this.$store.getters.anmeldungen.filter(player => player.type < 2);
                angemeldet = angemeldet.concat(this.$store.getters.ersatzSpieler);
                angemeldet.push(lfgUser);
                angemeldet.push(gcgUser);
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
