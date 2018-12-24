<template>
    <v-btn fab
           :color="progressColor">
        <v-avatar>
            <v-img :src="icon(boss.abbr)">
            </v-img>
        </v-avatar>
    </v-btn>
</template>

<script>
    import icons from '../services/icons.js';

    export default {
        name: "ProgressBossComp",
        props: ['boss', 'progress'],
        computed: {
            progressColor: function() {
                if (this.progress && this.progress.indexOf(this.boss.apiname) !== -1) return 'success';
                else return 'error';
            }
        },
        methods: {
            icon: function(enc) {
                if (enc) return icons.encIcon(enc);
            }
        }
    }
</script>

<style scoped>

</style>