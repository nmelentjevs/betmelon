const uuidv4 = require('uuid/v4');

const db = require('../db/psqldb');

const bcrypt = require('bcryptjs');

const sendEmail = require('./email.send');
const msgs = require('./email.msgs');
const templates = require('./email.templates');

// The callback that is invoked when the user submits the form on the client.
exports.collectEmail = (req, res) => {
  console.log(req.body);
  const newUUID = uuidv4();

  let { name, username, email, password, rpassword } = req.body;

  password = password.toString();

  if (password === rpassword) {
    bcrypt.hash(password, 10, async (err, hash) => {
      db.query(`SELECT * FROM users WHERE email = '${email}'`)
        .then(results => {
          if (results.length === 0) {
            db.query(
              `INSERT INTO users(name, username, email, registered_on, confirmed, uuid, password) VALUES ('${name}', '${username}', '${email}', '${new Date(
                Date('dd/mm/yyyy:HH:MM')
              ).toUTCString()}', '0', '${newUUID}', '${hash}')`
            )
              .then(_ => {
                sendEmail(email, templates.confirm(newUUID));
                res.json({ msg: 'Success' });
              })
              .catch(err => res.status(500).json({ msg: err }));
          } else {
            res.json({ msg: 'User Exists' });
          }
        })
        .catch(err => res.send({ msg: err }));
    });
  }
};
// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = (req, res) => {
  const { id } = req.params;
  console.log(id);

  db.query(`SELECT * FROM users WHERE uuid = '${id}' AND confirmed = 'false'`)
    .then(results => {
      console.log(results);
      if (results.length === 0) {
        res.json({ msg: msgs.resend });
      } else {
        res.json({ msg: msgs.confirmed });
        db.query(`UPDATE users SET confirmed = 'true' WHERE uuid = '${id}'`)
          .then(_ => {
            res.json({ msg: 'Confirmed' });
          })
          .catch(err => res.json({ msg: err }));
      }
    })
    .catch(err => {
      res.json({ msg: err });
    });
};
