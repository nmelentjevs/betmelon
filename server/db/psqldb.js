const Pool = require('pg').Pool;

const psql = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});
psql.on('error', () => console.log('Lost Postgresql Connection'));

module.exports = psql;
