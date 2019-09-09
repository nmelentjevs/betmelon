const psql = require('../db/psqldb');

const { redisClient, redisPublisher } = require('../redis/redis');

exports.addBet = (req, res) => {
  console.log(req.body);
  let {
    home,
    away,
    country,
    league,
    match_date,
    bet,
    bet_type,
    score,
    imaginary,
    odds,
    result,
    bet_amount,
    comments
  } = req.body.betObj;
  const { username } = req.body;
  psql.query(
    `INSERT INTO bets(username, home, away, country, league, match_date, bet, bet_type, score, imaginary, odds, result, bet_amount, comments) VALUES ('${username}', '${home}', '${away}', '${country}', '${league}', '${match_date}', '${bet}', '${bet_type}', '${score}', '${imaginary}', '${odds}', '${result}', '${bet_amount}', '${comments}');`,
    (error, results) => {
      if (error) {
        // res.json({ msg: error });
        console.log('no');
        return;
      }
      // res.json({ msg: 'Bet Added' });
      // console.log('added');
      return;
    }
  );
  return;
};

exports.getBets = async (req, res) => {
  let username;
  if (req.params.username) {
    username = req.params.username;
  } else {
    username = req.body.username;
  }
  // redisClient.get('bets', async (err, values) => {
  //   if (values && action !== 'false') {
  //     console.log('Got from cache');
  //     res.send(JSON.parse(values));
  //   } else {
  console.log('Got from psql');

  await psql
    .query(
      `SELECT bets.username, bets.home, bets.away, bets.country, bets.league, bets.match_date, bets.bet, bets.bet_type, bets.score, bets.imaginary, bets.odds, bets.result, bets.bet_amount, bets.comments, bets.is_prediction, bets.date_added, bets.id FROM bets WHERE bets.username = '${username}';`
    )
    .then(bets => {
      // redisClient.setex('bets', 60, JSON.stringify(bets.rows));
      bets.rows.map(bet => {
        bet.teams = `${bet.home} vs ${bet.away}`;
      });
      res.send({
        bets: bets.rows.map(bet => {
          delete bet.home;
          delete bet.away;
          return bet;
        })
      });
    })
    .catch(err => console.log(err));
  // }
  // });
};

exports.editBet = (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const {
    teams,
    country,
    league,
    match_date,
    bet,
    score,
    imaginary,
    odds,
    result,
    bet_amount,
    comments,
    anonymous
  } = req.body.bet;

  psql
    .query(
      `UPDATE bets SET 
    home='${teams.split('vs')[0].replace(' ', '')}', 
    away='${teams.split('vs')[1].replace(' ', '')}',
    country='${country}',
    league='${league}',
    bet='${bet}',
    score='${score}',
    imaginary='${imaginary}',
    odds='${odds}',
    result='${result}',
    bet_amount='${bet_amount}',
    comments='${comments}' WHERE bets.id = ${id};`
    )
    .then(bets => {
      console.log('Update');
    })
    .catch(err => {
      throw err;
    });
};

exports.deleteBet = (req, res) => {
  const { id, username } = req.body;

  psql
    .query(
      `DELETE FROM bets
      WHERE bets.id = ${id} AND 
      bets.username = '${username}';`
    )
    .then(bets => {
      console.log('Deleted');
    })
    .catch(err => {
      throw err;
    });
};
