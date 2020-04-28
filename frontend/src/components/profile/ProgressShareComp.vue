<template>
    <div>
        <v-switch
                v-model="switchValue"
                color="info"
                label="Für Profilbesucher anzeigen"
        ></v-switch>
    </div>
</template>

<script>
    import _users from '../../services/endpoints/users';

    export default {
        name: "ProgressShareComp",
        data: () => ({
            share: null
        }),
        computed: {
            switchValue: {
                get: function() {
                    return this.share;
                },
                set: async function(value) {
                    this.share = value;
                    await _users.setProgressShared(value);
                }
            },
        },
        created: async function() {
            this.share = await _users.hasProgressShared();
        }
    }
</script>

<style scoped>

</style>