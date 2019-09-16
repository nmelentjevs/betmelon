const Pool = require('pg').Pool;

const initOptions = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: false
};

const pgp = require('pg-promise')();

const db = pgp(initOptions);

// db.tx(t => {
//   return t.batch([
//     t.any(
//       "SELECT COUNT(*) FROM bets WHERE username='syune123' AND result ~ '^W'"
//     ),
//     t.any(
//       "SELECT COUNT(*) FROM bets WHERE username='syune123' AND result ~ '^L'"
//     ),
//     t.any("SELECT COUNT(*) FROM bets WHERE username='syune123'")
//   ]);
// })
//   .then(data => {
//     console.log(data);
//     db.tx(t => {
//       const win_ratio = (data[2][0].count / data[0][0].count).toFixed(2);
//       t.none(
//         `UPDATE users SET win_ratio=(${
//           !win_ratio ? win_ratio : 0
//         }) WHERE username='syune123';`
//       );
//     });
//   })
//   .catch(error => {
//     console.log(error); // print error;
//   });

const psql = new Pool(initOptions);
db.connect((err, client, release) => {
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

module.exports = db;
