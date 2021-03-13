<template>
    <div>
        <v-switch
                v-model="switchValue"
                color="info"
                label="Für Profilbesucher anzeigen"
        ></v-switch>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _users from '../../services/endpoints/users';

    export default Vue.extend({
        name: "ProgressShareComp",
        data: () => ({
            share: null
        }),
        computed: {
            switchValue: {
                get: function(): any {
                    return this.share;
                },
                set: async function(value: any): Promise<void> {
                    this.share = value;
                    await _users.setProgressShared(value);
                }
            },
        },
        created: async function() {
            this.share = await _users.hasProgressShared(null);
        }
    })
</script>

<style scoped>

</style>