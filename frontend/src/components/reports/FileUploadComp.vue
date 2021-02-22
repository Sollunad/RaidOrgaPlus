<template>
    <v-file-input
            v-model="file"
            :loading="loading"
            :error="error"
            :success="success"
            accept=".evtc,.zevtc"
            label="Log-File (.evtc oder .zevtc)"
            class="upload"></v-file-input>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _reports from '../../services/endpoints/reports';

    export default Vue.extend({
        name: "FileUploadComp",
        props: ['aufstellung'],
        data: () => ({
            btnText: 'Senden',
            btnColor: '',
            loading: false,
            error: false,
            success: false,
            file: null
        }),
        methods: {
            submit: async function(): Promise<void> {
                this.error = false;
                this.success = false;
                const file: any = this.file;
                if (file && (file.name.includes('.evtc') || file.name.includes('.zevtc'))) {
                    this.loading = true;
                    const response = await _reports.uploadReport(file, this.aufstellung.id);
                    this.loading = false;
                    if (response[0]) {
                        this.$emit('uploadComplete', response[0]);
                        this.success = true;
                    } else {
                        this.error = true;
                    }
                } else {
                    this.loading = false;
                    this.error = true;
                }
            }
        },
        watch: {
            file: function(): void {
                this.submit();
            }
        }
    })
</script>

<style scoped>
    .upload {
        margin: -5px 5px;
    }
</style>