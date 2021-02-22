<template>
    <div>
        <v-container>
            <v-layout row wrap>
                <v-flex xs11>
                    <v-textarea
                            class="kommentar"
                            outline
                            label="Kommentar"
                            v-model="text"
                            counter="1000"
                            :rules="rules"
                    ></v-textarea>
                </v-flex>
                <v-flex xs1>
                    <v-btn icon class="button" @click="saveText" :disabled="!isDirty">
                        <v-icon>save</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _moderation from '../../services/endpoints/moderation';

    export default Vue.extend({
        name: "ModListUserEditCommentComp",
        props: ['user'],
        data: () => ({
            savedText: '',
            text: '',
            lastChange: 0,
        }),
        computed: {
            rules: function (): any {
                return [
                    (v: string) => (!v || v.length <= 1000) || 'Bitte halte dich kurz ;)'
                ];
            },
            isDirty: function (): boolean {
                return !(this.text === this.savedText);
            }
        },
        methods: {
            saveText: async function (): Promise<void> {
                if (this.text.length <= 1000) {
                    await _moderation.setComment(this.user.id, this.text);
                    this.savedText = this.text;
                }
            }
        },
        created: async function (): Promise<void> {
            this.text = this.user.comment;
            this.savedText = this.text;
        },
        watch: {
            text: function (): void {
                this.lastChange = Date.now();
                const currentChange = this.lastChange;
                const that = this;
                setTimeout(function () {
                    if (currentChange === that.lastChange && that.isDirty) {
                        that.saveText();
                    }
                }, 2000)
            }
        },
        beforeDestroy: function (): void {
            if (this.isDirty) {
                this.saveText();
            }
        }
    })
</script>

<style scoped>
    .kommentar {
        margin-top: 10px;
        margin-bottom: -40px;
    }
</style>
