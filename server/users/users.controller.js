const psql = require('../db/psqldb');

const { redisClient, redisPublisher } = require('../redis/redis');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getAll = (req, res) => {
  req.params.id = req.params.id.replace(':', '');

  psql.query(
    `SELECT * FROM users ${
      req.params.id ? `WHERE username = '${req.params.id}'` : ''
    };`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        user: {
          name: results.rows[0].name,
          email: results.rows[0].email,
          username: results.rows[0].username.replace(/\s/g, ''),
          sheet_id: results.rows[0].sheet_id
        }
      });
    }
  );
};
exports.addUser = async (req, res, next) => {
  let { name, username, email, password, rpassword } = req.body;

  password = password.toString();

  if (password === rpassword) {
    bcrypt.hash(password, 10, async (err, hash) => {
      psql
        .query(
          `INSERT INTO users(name, email, registered_on, password, username) VALUES ('${name}', '${email}', '${new Date(
            Date('dd/mm/yyyy:HH:MM')
          ).toUTCString()}', '${hash}', '${username}');`
        )
        .then(results => res.json(results.rows))
        .catch(err => console.log(err));
    });
    next();
  } else {
    res.send({ error: 'Passwords do not match' });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  psql
    .query(`SELECT * FROM users WHERE username = '${username}'`)
    .then(results => {
      if (results.rows.length === 0) {
        res.json({ msg: 'No such user', err: 'username' });
      } else {
        bcrypt
          .compare(password.toString(), results.rows[0].password.toString())
          .then(matched => {
            if (matched) {
              const user = {
                name: results.rows[0].name,
                email: results.rows[0].email,
                username: results.rows[0].username.replace(/\s/g, ''),
                sheet_id: results.rows[0].sheet_id
              };
              res.json({
                login: true,
                user
              });
              redisClient.setex('username', 10000, user.username);
              redisPublisher.publish('insert', 'username');
            } else {
              res.json({ login: false, err: 'password' });
            }
          });
      }
    })
    .catch(err => console.log(err));

  // bcrypt.compare(password, user.password, function(err, result) {
  //   if (result == true) {
  //     res.redirect('/home');
  //   } else {
  //     res.send('Incorrect password');
  //     res.redirect('/');
  //   }
  // });
};

exports.addSheetId = (username, id) => {
  psql
    .query(`UPDATE users SET sheet_id = '${id}' WHERE username = '${username}'`)
    .then(results => {
      return { msg: 'Success' };
    })
    .catch(err => console.log(err));
};

exports.setUserFromLocal = (req, res) => {
  const { username } = req.body;

  psql
    .query(`SELECT * FROM users WHERE username = '${username}'`)
    .then(results =>
      res.send({
        user: {
          name: results.rows[0].name,
          email: results.rows[0].email,
          username: results.rows[0].username.replace(/\s/g, ''),
          sheet_id: results.rows[0].sheet_id
        }
      })
    )
    .catch(err => console.log(err));
};

exports.getCurrentUser = (req, res) => {
  redisClient.get('username', (err, values) => {
    console.log(values);
    res.send(values);
  });
};
