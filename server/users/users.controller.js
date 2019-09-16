const db = require('../db/psqldb');

const { redisClient, redisPublisher } = require('../redis/redis');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getAll = (req, res) => {
  console.log(req.params.id);

  if (req.params.id === 'halloffameusers') {
    db.query(`SELECT * FROM users;`)
      .then(users => {
        console.log(users);
        res.status(200).json({
          users
        });
      })
      .catch(err => console.log(err));
  } else {
    db.query(
      `SELECT * FROM users ${
        req.params.id ? `WHERE username = '${req.params.id}'` : ''
      };`
    )
      .then(results => {
        res.status(200).json({
          user: {
            name: results[0].name,
            email: results[0].email,
            username: results[0].username.replace(/\s/g, ''),
            sheet_id: results[0].sheet_id
          }
        });
      })
      .catch(err => console.log(err));
  }
};

exports.addUser = async (req, res, next) => {
  let { name, username, email, password, rpassword } = req.body;

  password = password.toString();

  if (password === rpassword) {
    bcrypt.hash(password, 10, async (err, hash) => {
      db.query(
        `INSERT INTO users(name, email, registered_on, password, username) VALUES ('${name}', '${email}', '${new Date(
          Date('dd/mm/yyyy:HH:MM')
        ).toUTCString()}', '${hash}', '${username}');`
      )
        .then(results => res.json(results))
        .catch(err => console.log(err));
    });
    next();
  } else {
    res.send({ error: 'Passwords do not match' });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(`SELECT * FROM users WHERE username = '${username}'`)
    .then(results => {
      if (results.length === 0) {
        res.json({ msg: 'No such user', err: 'username' });
      } else {
        bcrypt
          .compare(password.toString(), results[0].password.toString())
          .then(matched => {
            if (matched) {
              const user = {
                name: results[0].name,
                email: results[0].email,
                username: results[0].username.replace(/\s/g, ''),
                sheet_id: results[0].sheet_id
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

exports.setUserFromLocal = (req, res) => {
  const { username } = req.body;

  db.query(`SELECT * FROM users WHERE username = '${username}'`)
    .then(results =>
      res.send({
        user: {
          name: results[0].name,
          email: results[0].email,
          username: results[0].username.replace(/\s/g, ''),
          sheet_id: results[0].sheet_id
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
