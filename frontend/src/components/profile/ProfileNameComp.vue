<template>
    <div>
        <div class="display-1" v-if="!edit">
            {{name}} ({{user.accname}})
            <v-btn flat icon v-if="ownProfile" @click="startEditing">
                <v-icon>edit</v-icon>
            </v-btn>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation class="form" v-if="edit">
            <v-text-field
                    @keypress.enter="submit"
                    v-model="name"
                    :rules="nameRules"
                    label="Anzeigename"
                    required
                    counter="10"
                    solo
            ></v-text-field>
            <v-btn
                    @click="submit"
            >
                Speichern
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    import _users from '../../services/endpoints/users';

    export default {
        name: "ProfileNameComp",
        props: ['user', 'ownProfile'],
        data: () => ({
            name: null,
            edit: false,
            nameRules: [
                v => !!v || 'Bitte gib einen Namen an',
                v => v.length <= 10 || 'Bitte wähle einen kürzeren Namen'
            ],
        }),
        methods: {
            startEditing: function() {
                this.edit = true;
            },
            submit: async function() {
                if (this.$refs.form.validate()) {
                    if (this.user) {
                        await _users.changeName(this.name);
                        this.$emit('changeName', this.name);
                        this.edit = false;
                    }
                }
            },
        },
        created: function() {
            this.name = this.user.name;
        }
    }
</script>

<style scoped>

</style>