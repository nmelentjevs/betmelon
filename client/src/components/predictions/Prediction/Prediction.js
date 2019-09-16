import React, { useEffect, useState } from 'react';

import './Prediction.scss';

import Moment from 'react-moment';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const Prediction = ({ data, like, state }) => {
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

  const colors = [
    '#715aff',
    '#f69dc5',
    '#f9a951',
    '#8c1a6a',
    '#e84855',
    '#4e937a',
    '#d8cc34'
  ];
  // const colors = [
  //   '#715aff',
  //   '#4e937a',
  //   '#002400',
  //   '#05668d',
  //   '#e84855',
  //   '#8c1a6a',
  //   '#d8cc34'
  // ];
  const countries = [
    'England',
    'Italy',
    'Germany',
    'France',
    'Spain',
    'Europe',
    'National'
  ];

  const getColor = teamCountry => {
    let color;
    countries.map((country, i) => {
      if (teamCountry === country) {
        color = colors[i];
      }
      return;
    });
    return color;
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
        >
          <div>
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

export default Prediction;
