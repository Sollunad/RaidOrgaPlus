const fs = require('fs');
const exec = require('child_process').execFile;

const PARSER_PATH = 'reports/Parser/GuildWars2EliteInsights.exe';
const CONFIG_PATH = 'reports/Parser/GuildWars2EliteInsights.exe.config';

exports.parse = parse;

async function parse(filepath) {
    const id = filepath.split('/')[2].split('.')[0];
    return new Promise((resolve, reject) => {
        exec('mono', [PARSER_PATH, '-c', CONFIG_PATH, '-p', filepath], function(err, data) {
            console.log(id);
            fs.unlinkSync(filepath);
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}