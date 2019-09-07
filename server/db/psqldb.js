const Pool = require('pg').Pool;

const psql = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});
psql.connect();
psql.on('connect', () =>
  console.log(
    `Connected to database:${process.env.PGDATABASE} on port ${process.env.PGPORT}`
  )
);
psql.on('error', () => console.log("Couldn't connect to postgres"));

module.exports = psql;
