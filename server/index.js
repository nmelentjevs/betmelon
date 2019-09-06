require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const psql = require('./db/psqldb');

const emailController = require('./email/email.controller');
const authController = require('./users/users.controller');
const preditionController = require('./predictions/predictions.controller');
const betsController = require('./bets/bets.controller');
const sheetsController = require('./sheets/sheets.controller');

const helmet = require('helmet'); // creates headers that protect from attacks (security)
const bodyParser = require('body-parser'); // turns response into usable format
const cors = require('cors'); // allows/disallows cross-site communication
const morgan = require('morgan'); // logs requests

const { client, authorize } = require('./sheets/sheets.controller');

// App Middleware
// const whitelist = ['http://localhost:3001', '*'];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };
app.use(helmet());
// app.use(cors(corsOptions));

app.use(cors());
app.use(morgan('combined')); // use 'tiny' or 'combined'

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/bets/authorize_sheets', (req, res) => {
  authorize();
});

app.post('/bets/create_sheet', async (req, res) => {
  const sheetId = await sheetsController.createNewSheet(client, req);

  // sheetsController.givePermissions(client, req, sheetId);

  res.send({ sheet: sheetId });
});

app.get('/bets/loadbets/:id', async (req, res) => {
  let bets = await betsController.getBets(client, req, res);
  filteredBets = bets.filter(bet => {
    return bet.length > 0 && bet[0] !== (0 | '0');
  });
  res.send({ bets: filteredBets });
});

app.post('/bets/addbet/:id', async (req, res) => {
  const add = await betsController.addBet(client, req);
  const bets = await betsController.getBets(client, req, res);
  res.send({ bets });
});

app.post('/bets/:updatebet', async (req, res) => {
  const update = await betsController.updateBet(client, req.body);
  const bets = await betsController.getBets(client, req, res);
  filteredBets = bets.filter(bet => {
    return bet.length > 0 && bet[0] !== (0 | '0');
  });
  res.send({ bets: filteredBets });
});

app.get('/predictions/all/:filter/:action', preditionController.getPredictions);

app.post('/predictions/add', preditionController.addPrediction);

app.post('/predictions/like', preditionController.likePrediction);

app.post('/predictions/edit', preditionController.editPrediction);

app.get('/users/all/:id', authController.getAll);

app.post('/users/add', authController.addUser, emailController.collectEmail);

app.post('/users/login', authController.login);

app.get('/users/current', authController.getCurrentUser);

app.post('/users/localuser', async (req, res) => {
  authController.setUserFromLocal(req, res);
});

app.delete('/predictions/comments', (req, res) =>
  predictions.deleteTableData(req, res, db)
);

// This is the endpoint that is hit from the onSubmit handler in Landing.js
// The callback is shelled off to a controller file to keep this file light.
app.post('/email/register', emailController.collectEmail);

// Same as above, but this is the endpoint pinged in the componentDidMount of
// Confirm.js on the client.
app.get('/email/confirm/:id', emailController.confirmEmail);

app.listen(port, () => console.log(`Listening on port ${port}`));
