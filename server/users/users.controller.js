const db = require('../db/psqldb');

const jwt = require('jsonwebtoken');

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
            registered_on: results[0].registered_on,
            confirmed: results[0].confirmed,
            win_ratio: results[0].win_ratio,
            total_bets: results[0].total_bets,
            total_wins: results[0].total_wins,
            total_loses: results[0].total_loses,
            privacy_predictions: results[0].privacy_predictions,
            privacy_bets: results[0].privacy_bets,
            privacy_profile: results[0].privacy_profile
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
                username: results[0].username.replace(/\s/g, '')
              };
              jwt.sign({ user }, 'betmelon', (err, token) => {
                console.log(token);
                res.json({
                  login: true,
                  user,
                  token
                });
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

exports.verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.body.token;
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    next();
  } else {
    // Forbidden
    console.log('error');
    res.json({ msg: 'Unathorized' });
  }
};

exports.setUserFromLocal = (req, res) => {
  const { username } = req.body;

  db.query(`SELECT * FROM users WHERE username = '${username}'`)
    .then(results =>
      res.send({
        user: {
          name: results[0].name,
          email: results[0].email,
          username: results[0].username.replace(/\s/g, '')
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

exports.updateSettings = (req, res) => {
  const { username } = req.params;
  const {
    initialSettings: { predictions, bets, profile }
  } = req.body;

  console.log(req.params);
  console.log(req.body);

  db.query(
    `UPDATE users SET 
    privacy_predictions=${predictions}, 
    privacy_bets=${bets}, 
    privacy_profile=${profile} 
    WHERE username = '${username}'`
  )
    .then(_ =>
      res.send({
        msg: 'updated'
      })
    )
    .catch(err =>
      res.send({
        msg: err
      })
    );
};
