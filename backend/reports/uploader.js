const fetch = require('node-fetch');
const config = require("./config.json");
const fs = require('fs');
const followRedirects = require('follow-redirects');
const FormData = require('form-data');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 50 * 1024 * 1024;

exports.upload = uploadReport;

async function uploadReport(filepath) {
    const readstream = fs.createReadStream(filepath);
    const url = `https://dps.report/uploadContent`;
    const formData = new FormData();
    formData.append('file', readstream);
    formData.append('json', '1');
    try {
        const response = (await fetch(url, { method: 'POST', body: formData })).json();
        fs.unlinkSync(filepath);
        return response;
    } catch (e) {
        console.log(e);
        fs.unlinkSync(filepath);
    }
}