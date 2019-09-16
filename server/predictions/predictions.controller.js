const db = require('../db/psqldb');

const { redisClient, redisPublisher } = require('../redis/redis');

exports.addPrediction = (req, res) => {
  const {
    country,
    league,
    prediction,
    title,
    odds,
    amount
  } = req.body.prediction;
  const { user } = req.body;
  db.query(
    `INSERT INTO predictions(author, text, title, liked, disliked, country, league, odds, amount) VALUES ('${user}', '${prediction.replace(
      "'",
      '*'
    )}', '${title}', '0', '0', '${country}', '${league}', '${odds}', '${amount}');`,
    (error, results) => {
      if (error) {
        res.status(500).json({ msg: error });
      }
      res.status(200).json({ msg: 'Prediction Added' });
    }
  );
};

exports.getPredictions = async (req, res, next) => {
  const { action, filter } = req.params;
  console.log(req.params);

  redisClient.get('predictions', async (err, values) => {
    if (values && action !== 'false' && filter !== 'all') {
      console.log('Got from cache');
      res.send(JSON.parse(values));
    } else {
      console.log('Got from psql');
      const leagues = [
        'Premier League',
        'Championship',
        'EFL Cup',
        'FA Cup',
        'Ligue 1',
        'Ligue 2',
        'Coupe de la Ligue',
        'La Liga',
        'Segunda Division',
        'Copa Del Rey',
        'Bundesliga',
        '2. Bundesliga',
        'DFB Pokal',
        'Seria A',
        'Seria B',
        'Coppa Italia',
        'Champions League',
        'Europa League',
        'World Cup',
        'Europe Cup',
        'Copa America'
      ];

      const countries = [
        'England',
        'France',
        'Spain',
        'Germany',
        'Italy',
        'Europe',
        'National'
      ];
      let filter;

      isCountry = countries.includes(req.params.filter);
      isLeague = leagues.includes(req.params.filter);
      isUser = !isCountry && !isLeague;

      (isCountry || isLeague || isUser) && !req.params.filter.match('^all*')
        ? (filter = req.params.filter)
        : (filter = false);

      // console.log(
      //   'country:' + isCountry,
      //   'league: ' + isLeague,
      //   'user: ' + isUser,
      //   'filter: ' + filter
      // );
      await db
        .tx(t => {
          return t.batch([
            t.any(
              `SELECT predictions.id, predictions.author, predictions.text, predictions.title, predictions.edited_on, predictions.league, predictions.country, predictions.wrote_on, predictions.odds, predictions.amount, users.username
               FROM users
               INNER JOIN predictions ON users.username = predictions.author  ${
                 filter
                   ? isCountry
                     ? `AND predictions.country = '${filter}'`
                     : isLeague
                     ? `AND predictions.league = '${filter}'`
                     : isUser
                     ? `AND predictions.author = '${filter}'`
                     : ''
                   : ''
               }
               ORDER BY predictions.wrote_on;`
            ),
            t.any(
              `SELECT liker_username, post_id, emotion
               FROM (
                 Select liker_username, post_id, 'Like' as emotion
                 From likes
                 Union 
                 Select disliker_username, post_id, 'Dislike' as emotion
                 From dislikes
               ) As a
               Order by post_id`
            )
          ]);
        })
        .then(data => {
          const predictions = data[0];
          const likes = data[1];

          predictions.map(prediction => {
            prediction.text = prediction.text.replace('*', "'");
            prediction.liked = 0;
            prediction.disliked = 0;
            prediction.liked_by = [];
            prediction.disliked_by = [];
            likes.filter(like => {
              if (prediction.id === like.post_id) {
                if (like.emotion === 'Like') {
                  prediction.liked += 1;
                  prediction.liked_by.push(like.liker_username);
                } else {
                  prediction.disliked += 1;
                  prediction.disliked_by.push(like.liker_username);
                }
              }
            });
          });

          let flags = [];
          let output = [];
          let l = predictions.length;
          let i;

          for (i = 0; i < l; i++) {
            if (flags.includes(predictions[i].id)) {
              continue;
            } else {
              flags.push(predictions[i].id);
              output.push(predictions[i]);
            }
          }

          // redisClient.setex('predictions', 60, JSON.stringify(predictions));
          res.json(output);
        })
        .catch(err => console.log(err));
    }
  });
};

exports.likePrediction = (req, res) => {
  const { post_id, like, username } = req.body;
  console.log(req.body);
  if (like == 1) {
    db.query(
      `INSERT INTO likes(post_id, liker_username) VALUES('${post_id}', '${username}') ON CONFLICT DO NOTHING;`
    )
      .then(result => res.json({ msg: 'liked' }))
      .catch(err => res.json(err));
  } else {
    db.query(
      `INSERT INTO dislikes(post_id, disliker_username) VALUES('${post_id}', '${username}') ON CONFLICT DO NOTHING;`
    )
      .then(result => res.json({ msg: 'disliked' }))
      .catch(err => res.json(err));
  }
};

exports.editPrediction = (req, res) =>
  db
    .query(
      `UPDATE predictions text SET text='${
        req.body.text
      }', edited_on = '${new Date(
        Date('dd/mm/yyyy:HH:MM')
      ).toUTCString()}' WHERE id='${req.body.id}';`
    )
    .then(res.json({ msg: 'edited' }))
    .catch(err => res.json({ err }));
