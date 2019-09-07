const psql = require('../db/psqldb');

const { redisClient, redisPublisher } = require('../redis/redis');

exports.addPrediction = (req, res) => {
  const { country, league, prediction, title } = req.body.prediction;
  const { user } = req.body;
  psql.query(
    `INSERT INTO public.predictions(author, text, title, liked, disliked, country, league) VALUES ('${user}', '${prediction.replace(
      "'",
      '*'
    )}', '${title}', '0', '0', '${country}', '${league}');`,
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

      await psql
        .query(
          `SELECT public.predictions.id, public.predictions.author, public.predictions.text, public.predictions.title, public.predictions.edited_on, public.predictions.league, public.predictions.country, public.predictions.wrote_on, users.username
          FROM public.users
          INNER JOIN public.predictions ON public.users.username = public.predictions.author  ${
            filter
              ? isCountry
                ? `AND public.predictions.country = '${filter}'`
                : isLeague
                ? `AND public.predictions.league = '${filter}'`
                : isUser
                ? `AND public.predictions.author = '${filter}'`
                : ''
              : ''
          }
          ORDER BY public.predictions.wrote_on;
        `
        )
        .then(async predictions => {
          await psql
            .query(
              `SELECT liker_username, post_id, emotion
              FROM (
                Select liker_username, post_id, 'Like' as emotion
                From public.likes
                Union 
                Select disliker_username, post_id, 'Dislike' as emotion
                From public.dislikes
              ) As a
              Order by post_id
              `
            )
            .then(likes => {
              predictions.rows.map(prediction => {
                prediction.text = prediction.text.replace('*', "'");
                prediction.liked = 0;
                prediction.disliked = 0;
                prediction.liked_by = [];
                prediction.disliked_by = [];
                likes.rows.filter(like => {
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

              redisClient.setex(
                'predictions',
                60,
                JSON.stringify(predictions.rows)
              );
              console.log(predictions.rows);
              res.json(predictions.rows);
            });
        })
        .catch(err => console.log(err));
    }
  });
};

exports.likePrediction = (req, res) => {
  const { post_id, like, username } = req.body;
  if (like == 1) {
    psql.query(
      `INSERT INTO public.likes(post_id, liker_username) VALUES('${post_id}', '${username}');`,
      (error, results) => {
        if (error) {
          res.status(500).json({ msg: error });
        }
        res.status(200).json(results.rows);
      }
    );
  } else {
    psql.query(
      `INSERT INTO public.dislikes(post_id, disliker_username) VALUES('${post_id}', '${username}');`,
      (error, results) => {
        if (error) {
          res.status(500).json({ msg: error });
        }
        res.status(200).json(results.rows);
      }
    );
  }
};

exports.editPrediction = (req, res) =>
  psql.query(
    `UPDATE public.predictions text SET text='${
      req.body.text
    }', edited_on = '${new Date(
      Date('dd/mm/yyyy:HH:MM')
    ).toUTCString()}' WHERE id='${req.body.id}';`,
    (error, results) => {
      if (error) {
        res.status(500).json({ msg: error });
      }
      res.status(200).json(results.rows);
    }
  );
