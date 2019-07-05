<template>
    <span class="form">
        <input type="file" id="file" ref="file"/>
        <v-btn v-on:click="submit()" :color="btnColor" class="button">{{btnText}}</v-btn>
    </span>
</template>

<script>
    import _reports from '../../services/endpoints/reports';

    export default {
        name: "FileUploadComp",
        props: ['aufstellung'],
        data: () => ({
            btnText: 'Senden',
            btnColor: ''
        }),
        methods: {
            submit: async function() {
                const evtc = this.file = this.$refs.file.files[0];
                this.btnText = 'Laden...';
                this.btnColor = '';
                const response = await _reports.uploadReport(evtc, this.aufstellung.id);
                if (response[0]) {
                    this.btnText = 'Fertig!';
                    this.btnColor = 'success';
                    this.$emit('uploadComplete', response[0]);
                } else {
                    this.btnText = 'Fehler!';
                    this.btnColor = 'error';
                }
            }
        }
    }
</script>

<style scoped>
    .form {
        margin-left: 7px;
    }

    .button {
        margin-left: -10px;
    }
</style>