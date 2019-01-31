const config = require("./config.json");
const sql = require('mysql');

exports.query = query;
exports.queryV = queryV;

function query(command) {
  const start = Date.now();
  const con = sql.createConnection(config);
  return new Promise( function(resolve, reject) {
    con.query(command, (err,rows) => {
      if (err) return reject(err);
      const duration = Date.now() - start;
      console.log(`${duration}: ${command}`);
      resolve(rows);
    });
    con.end();
  });
}

function queryV(command, values) {
  const start = Date.now();
  const con = sql.createConnection(config);
  return new Promise( (resolve, reject) => {
      con.query(command, values, (err,rows) => {
        if (err) return reject(err);
        const duration = Date.now() - start;
        console.log(`${duration}: ${command} | ${values}`);
        resolve(rows);
      });
      con.end();
    });
}
