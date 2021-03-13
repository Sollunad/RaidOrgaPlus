// const fs = require('fs');
import fs from "fs";

export { readJSON as read, writeJSON as write };

function readJSON(file) {
    const rawdata = fs.readFileSync(`stores/${file}.json`).toString();
    const json = JSON.parse(rawdata);
    return json;
}

function writeJSON(file, json) {
    const data = JSON.stringify(json);
    fs.writeFileSync(`stores/${file}.json`, data);
}