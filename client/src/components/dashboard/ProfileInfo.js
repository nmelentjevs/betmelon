import React from 'react';

import { Link } from 'react-router-dom';

// Helpers
import Moment from 'react-moment';

// Styles
import { centeredFullWidthColumnMd } from '../common/CommonStyles';

// Components

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const ProfileInfo = ({ profile }) => {
  console.log(profile);
  return (
    <div style={centeredFullWidthColumnMd}>
      <Card
        className="text-center"
        className="mt-4"
        style={{
          minWidth: '50%',
          minHeight: '18rem',
          textAlign: 'center',
          marginBottom: '50px'
        }}
        bg="dark"
        text="white"
      >
        <Card.Header>{profile.username}</Card.Header>
        <Card.Body>
          <Card.Title style={{ color: 'whitesmoke' }}>
            Total bets up to date:
          </Card.Title>
          <Card.Text>
            Wins: {profile.total_wins} / Loses: {profile.total_loses} / Total:{' '}
            {profile.total_bets}
          </Card.Text>
          <Link to={`/statistics/${profile.username}`}>
            <Button className="purple-border background-none">
              Check your advanced statistics
            </Button>
          </Link>
        </Card.Body>
        <Card.Footer className="text-muted">
          Registered on:{' '}
          <Moment format="DD MMM YYYY">{profile.registered_on}</Moment>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProfileInfo;
