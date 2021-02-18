import config from "./config.json";
import sql, { ConnectionConfig } from 'mysql';

const dbConfig: ConnectionConfig = {
	typeCast: function (field, next) {
		if (field.type === 'TINY' && field.length === 1) {
			return (field.string() === '1');
		}
		else {
			return next();
		}
	},
	...config
};

export function query<T>(command: string): Promise<T> {
  const start = Date.now();
  const con = sql.createConnection(dbConfig);
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

export function queryV<T>(command: string, values: any): Promise<T> {
  const start = Date.now();
  const con = sql.createConnection(dbConfig);
  return new Promise( (resolve, reject) => {
      con.query(command, values, (err,rows) => {
        if (err) return reject(err);
        const duration = Date.now() - start;
        console.log(`${duration}: ${command} | ${values}`);
        resolve(rows as T);
      });
      con.end();
    });
}
