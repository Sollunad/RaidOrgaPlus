const fs = require('fs');
const exec = require('child_process').execFile;

const PARSER_PATH = 'reports/Parser/GuildWars2EliteInsights.exe';

exports.parse = parse;

async function parse(filepath) {
    const id = filepath.split('/')[3].split('.')[0];
    return new Promise((resolve, reject) => {
        exec(PARSER_PATH, [filepath], function(err, data) {
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