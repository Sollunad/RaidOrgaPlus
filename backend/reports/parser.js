const fs = require('fs');
const exec = require('child_process').execFile;

const PARSER_PATH = 'reports/Parser/GuildWars2EliteInsights.exe';
const CONFIG_PATH = 'reports/Parser/config.conf';

exports.parse = parse;

async function parse(filepath) {
    const id = filepath.split('/')[2].split('.')[0];
    return new Promise((resolve, reject) => {
        exec('mono', [PARSER_PATH, '-c', CONFIG_PATH, '-p', filepath], function(err, data) {
            try {
                fs.unlinkSync(filepath);
            } catch(e) {

            }
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}