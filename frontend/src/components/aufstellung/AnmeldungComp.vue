<template>
    <v-btn-toggle v-model="buttonValue" rounded>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn v-on="on">
                    <v-icon color="green">check_circle</v-icon>
                </v-btn>
            </template>
            Ich nehme teil
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn v-on="on">
                    <v-icon color="yellow">check_circle_outline</v-icon>
                </v-btn>
            </template>
            Ich nehme vielleicht teil
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn v-on="on">
                    <v-icon color="red">cancel</v-icon>
                </v-btn>
            </template>
            Ich nehme nicht teil
        </v-tooltip>
    </v-btn-toggle>
</template>

<script lang="ts">
	import { MyActions } from '@/models/Store/State';
	import Vue, { PropType } from 'vue';

    export default Vue.extend({
        name: "AnmeldungComp",
        props: {
			foreignAnmeldung: Object as PropType<any>
		},
        computed: {
            buttonValue: {
                get: function(): any {
                    if (this.foreignAnmeldung) {
                        return this.foreignAnmeldung;
                    }
					return this.$vStore.getters.anmeldung;
                },
                set: async function(type: any): Promise<void> {
                    if (this.foreignAnmeldung) {
                        this.$emit('anmelden', type);
                    } else {
						await this.$vStore.dispatch(MyActions.Anmelden, type);
                    }
                }
            }
        }
    })
</script>

<style scoped>

</style>