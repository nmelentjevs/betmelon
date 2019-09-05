import React, { useEffect, useState } from 'react';

import './Prediction.scss';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const Prediction = ({ data, like, state }) => {
  const [likePost, setLikePost] = useState(false);
  const [dislikePost, setDislikePost] = useState(false);

  useEffect(() => {}, [likePost, dislikePost]);

  const changeLikes = () => {
    data.liked += 1;
    setLikePost(true);
  };

  const changeDislikes = () => {
    data.disliked += 1;
    setDislikePost(true);
  };

  const colors = [
    'dark',
    'secondary',
    'info',
    'success',
    'danger',
    'warning',
    'primary'
  ];
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
    });
    return color;
  };

  return (
    <Card border="dark" className="mb-4">
      <Card.Body>
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
              <i className="fas fa-plus"></i> {data.liked}
            </Button>
            <Button
              variant="outline-danger"
              className="d.d-inline-block"
              onClick={() => {
                changeDislikes();
                like(data.id, -1, state.user.username);
              }}
            >
              <i className="fas fa-minus"></i> {data.disliked}
            </Button>
          </div>
          <Card.Title>{data.title}</Card.Title>
          <div>
            <Badge pill variant={getColor(data.country)} className="mr-2">
              {data.country}
            </Badge>
            <Badge pill variant={getColor(data.country)}>
              {data.league}
            </Badge>
          </div>
        </div>

        <Card.Text>{data.text}</Card.Text>

        <hr />
        <div className="card-footer">
          <Card.Text>
            <small className="text-muted">
              Last updated on {data.wrote_on}
              {/* TODO ADD DATE NOW - DATE WROTE ON */}
            </small>
          </Card.Text>
          <Card.Text>
            <small className="text-muted">
              By{' '}
              <Link to={`/users/profile/${data.username}`}>
                {data.username}
              </Link>
            </small>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Prediction;
