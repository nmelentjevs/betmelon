import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Moment from 'react-moment';

import { colors, countries, getColor } from './predictonHelper';

// Styles
import './Prediction.scss';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const Prediction = ({ data, like, state, mock }) => {
  const [likePost, setLikePost] = useState(false);
  const [dislikePost, setDislikePost] = useState(false);

  useEffect(() => {
    console.log(data);
  }, [likePost, dislikePost]);

  const changeLikes = () => {
    data.liked += 1;
    setLikePost(true);
  };

  const changeDislikes = () => {
    data.disliked += 1;
    setDislikePost(true);
  };

  return (
    <Card
      bg="dark"
      text="light"
      border="primary"
      className="mb-4 prediction-card"
    >
      <Card.Body className="prediction-card-body">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: '10px'
          }}
          className="prediction-card-badges"
        >
          {!mock ? (
            <div className="prediction-card-buttons">
              <Button
                className="d.d-inline-block mr-2"
                variant="outline-success"
                onClick={() => {
                  changeLikes();
                  like(data.id, 1, state.user.username);
                }}
              >
                {data.liked}
              </Button>
              <Button
                variant="outline-danger"
                className="d.d-inline-block"
                onClick={() => {
                  changeDislikes();
                  like(data.id, -1, state.user.username);
                }}
              >
                {data.disliked}
              </Button>
            </div>
          ) : (
            ''
          )}
          <div>
            <Badge
              pill
              style={{ backgroundColor: getColor(data.country) }}
              className="mr-2"
            >
              {data.country}
            </Badge>
            <Badge pill style={{ backgroundColor: getColor(data.country) }}>
              {data.league}
            </Badge>
          </div>
        </div>
        <Card.Title className="prediction-card-title text-center ">
          {data.title}
        </Card.Title>

        <Card.Text>{data.text}</Card.Text>

        <hr />
        <div className="prediction-card-footer">
          <Card.Text className="prediction-card-text">
            <small>
              <Moment format="D MMM YYYY">{data.wrote_on}</Moment> |{' '}
              <Moment format="hh:mm">{data.wrote_on}</Moment>
            </small>
          </Card.Text>
          <Card.Text className="prediction-card-text">
            <small>
              Bet odds: {data.odds} / amount: {data.amount} / possible profit: $
              {data.odds * data.amount - data.amount}
            </small>
          </Card.Text>
          <Card.Text className="prediction-card-text">
            <small>
              By:{' '}
              <Link to={`/statistics/${data.username}`}>{data.username}</Link>
            </small>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

Prediction.propTypes = {
  data: PropTypes.object,
  state: PropTypes.object,
  mock: PropTypes.bool,
  like: PropTypes.func
};

export default Prediction;
