<template>
	<v-checkbox v-model="saveDate" label="Datum bei Anmeldungen mit speichern?" />
</template>

<script lang="ts">
	import Vue from 'vue';

    export default Vue.extend({
        name: "AnmeldeEinstellungComp",
        props: ['raid', 'anmeldung'],
		data: () => ({
			saveDate: false
		}),
        computed: {
            // role: function(): string {
            //     switch(this.raid.role) {
            //         case 0: return "Spieler";
            //         case 1: return "Lieutenant";
            //         case 2: return "Raidleiter";
            //         default: return "";
            //     }
            // },
            // icon: function(): string {
            //     if (this.anmeldung) {
            //         const icons = ['check_circle', 'check_circle_outline', 'cancel', 'warning'];
            //         return icons.slice(this.anmeldung.type)[0];
            //     } else {
            //         return '';
            //     }
            // }
        },
        methods: {
            // saveRaid: function() {
            //     this.$vStore.dispatch(MyActions.OpenRaid, this.raid);
            // }
        }
    })
</script>

<style scoped>
</style>