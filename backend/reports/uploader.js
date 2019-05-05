const fetch = require('node-fetch');
const config = require("./config.json");
const fs = require('fs');
const followRedirects = require('follow-redirects');
const FormData = require('form-data');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 50 * 1024 * 1024;

exports.upload = uploadReport;

async function uploadReport(file) {
    const url = `https://dps.report/uploadContent`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userToken', config.userToken);
    formData.append('json', '1');
    return (await fetch(url, { method: 'POST', body: formData })).json();
}

async function test() {
    const file = fs.createReadStream('./20190219-210431.evtc');
    console.log(await uploadReport(file));
}

async function bla() {
    const file = fs.createReadStream('./20190219-210431.evtc');
    fs.writeFileSync('test.json', JSON.stringify(file));
}