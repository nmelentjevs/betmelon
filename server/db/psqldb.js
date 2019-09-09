const Pool = require('pg').Pool;

const psql = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: false
});
psql.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';",
    (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log(result.rows);
    }
  );
});
psql.on('connect', () => {
  console.log(
    `Connected to database:${process.env.PGDATABASE} on port ${process.env.PGPORT}`
  );
});
psql.on('error', () => console.log("Couldn't connect to postgres"));

module.exports = psql;
