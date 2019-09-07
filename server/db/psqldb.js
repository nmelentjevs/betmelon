const Pool = require('pg').Pool;

const psql = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});
psql.connect();
psql.on('connect', () => {
  console.log(
    `Connected to database:${process.env.PGDATABASE} on port ${process.env.PGPORT}`
  );
  psql.query(
    'CREATE TABLE IF NOT EXISTS users(id SERIAL UNIQUE, name VARCHAR(50),email VARCHAR(50),registered_on TIMESTAMPTZ DEFAULT Now(),confirmed BOOLEAN,uuid VARCHAR(100),username VARCHAR(25),password VARCHAR(100),sheet_id VARCHAR(100));'
  );

  psql.query(
    'CREATE TABLE IF NOT EXISTS predictions(id SERIAL UNIQUE,text VARCHAR(500),wrote_on TIMESTAMPTZ DEFAULT Now(),edited_on DATE,liked INT,disliked INT,author VARCHAR(50),country VARCHAR(50),league VARCHAR(50),teams VARCHAR(50),match_date DATE,title VARCHAR(50));'
  );

  psql.query(
    "INSERT INTO predictions(text,author,country,league,teams,title,match_date) VALUES ('test', 'test', 'test', 'test', 'test', 'test', '10.10.10') ON CONFLICT DO NOTHING/UPDATE;"
  );

  psql.query(
    "INSERT INTO predictions(text,author,country,league,teams,title,match_date) VALUES ('test', 'test', 'test', 'test', 'test', 'test', '10.10.10');"
  );

  psql.query(
    'CREATE TABLE IF NOT EXISTS likes(post_id INT,liker_username VARCHAR(50));'
  );

  psql.query(
    'CREATE TABLE IF NOT EXISTS dislikes(post_id INT,disliker_username VARCHAR(50));'
  );
});
psql.on('error', () => console.log("Couldn't connect to postgres"));

module.exports = psql;
