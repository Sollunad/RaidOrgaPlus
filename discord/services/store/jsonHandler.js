const fs = require('fs');

exports.read = readJSON;
exports.write = writeJSON;

function readJSON(file) {
    const rawdata = fs.readFileSync(`stores/${file}.json`);
    const json = JSON.parse(rawdata);
    return json;
}

function writeJSON(file, json) {
    const data = JSON.stringify(json);
    fs.writeFileSync(`stores/${file}.json`, data);
}