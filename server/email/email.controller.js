const uuidv4 = require('uuid/v4');

const psql = require('../db/psqldb');

const bcrypt = require('bcryptjs');

const sendEmail = require('./email.send');
const msgs = require('./email.msgs');
const templates = require('./email.templates');

// The callback that is invoked when the user submits the form on the client.
exports.collectEmail = (req, res) => {
  const newUUID = uuidv4();

  let { name, username, email, password, rpassword } = req.body;

  password = password.toString();

  if (password === rpassword) {
    bcrypt.hash(password, 10, async (err, hash) => {
      psql.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        (error, results) => {
          if (error) {
            throw error;
          } else if (results.rows.length === 0) {
            psql.query(
              `INSERT INTO users(name, username, email, registered_on, confirmed, uuid, password) VALUES ('${name}', '${username}', '${email}', '${new Date(
                Date('dd/mm/yyyy:HH:MM')
              ).toUTCString()}', '0', '${newUUID}', '${hash}')`,
              (error, results) => {
                if (error) {
                  throw error;
                }
                res.status(200).json({ msg: 'Success' });
              }
            );
            sendEmail(email, templates.confirm(newUUID));
          } else {
            res.status(200).json({ msg: 'User exists' });
          }
        }
      );
    });
  }
};

// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = (req, res) => {
  const { id } = req.params;

  psql.query(
    `SELECT * FROM users WHERE uuid = '${id}' AND confirmed = '0'`,
    (error, results) => {
      if (error) {
        throw error;
      } else if (results.rows.length === 0) {
        res.status(200).json({ msg: msgs.resend });
      } else {
        res.status(200).json({ msg: msgs.confirmed });
        psql.query(`UPDATE users SET confirmed = '1' WHERE uuid = '${id}'`),
          (error, results) => {
            if (error) {
              throw error;
            } else {
              res.status(200);
            }
          };
      }
    }
  );
};
