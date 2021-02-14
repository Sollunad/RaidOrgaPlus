import config from "./config.json";
import sql from 'mysql';

export function query(command) {
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

export function queryV(command, values) {
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
