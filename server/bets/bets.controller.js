const db = require('../db/psqldb');

const { redisClient, redisPublisher } = require('../redis/redis');

exports.addBet = (req, res) => {
  // console.log(req.body);
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
  db.tx(t => {
    return t.batch([
      t.any(
        `INSERT INTO bets(username, home, away, country, league, match_date, bet, bet_type, score, imaginary, odds, result, bet_amount, comments) VALUES ('${username}', '${home}', '${away}', '${country}', '${league}', '${match_date}', '${bet}', '${bet_type}', '${score}', '${imaginary}', '${odds}', '${result}', '${bet_amount}', '${comments}');`
      ),
      t.any(
        `SELECT COUNT(*) FROM bets WHERE username='${username}' AND result ~ '^W'`
      ),
      t.any(
        `SELECT COUNT(*) FROM bets WHERE username='${username}' AND result ~ '^L'`
      ),
      t.any(`SELECT COUNT(*) FROM bets WHERE username='${username}'`),
      t.any('SELECT * FROM bets;')
    ]);
  })
    .then(data => {
      const total_wins = data[1][0].count;
      const total_bets = data[3][0].count;
      const bets = data[4][0];
      db.tx(t => {
        const win_ratio = (total_wins / total_bets).toFixed(3);
        console.log(win_ratio);
        return t.batch([
          t.any(
            `UPDATE users SET win_ratio='${
              win_ratio ? win_ratio : 0
            }', total_bets = total_bets + 1, ${
              result.match('^W')
                ? 'total_wins = total_wins + 1'
                : 'total_loses = total_loses + 1'
            } WHERE username='${username}';`
          )
        ]);
      })
        .then(data => console.log(data))
        .catch(err => console.log(err));
      res.json({ bets });
    })
    .catch(error => {
      console.log(error); // print error;
    });
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

  // psql.tx

  await db
    .query(
      `SELECT bets.username, bets.home, bets.away, bets.country, bets.league, bets.match_date, bets.bet, bets.bet_type, bets.score, bets.imaginary, bets.odds, bets.result, bets.bet_amount, bets.comments, bets.is_prediction, bets.date_added, bets.id FROM bets WHERE bets.username = '${username}';
      `
    )
    .then(bets => {
      // redisClient.setex('bets', 60, JSON.stringify(bets.rows));
      bets.map(bet => {
        bet.teams = `${bet.home} vs ${bet.away}`;
      });
      res.send({
        bets: bets.map(bet => {
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

  db.query(
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

  db.query(
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

exports.hallOfFame = (req, res) => {};
