import React from 'react';

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

const CreateBettingProfile = ({ profile }) => (
  <Card style={{ width: '18rem', marginBottom: '20px' }}>
    <Card.Body>
      <Card.Title>Betsheets</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Get control of your bets
      </Card.Subtitle>
      <Card.Text>
        You don't seem to have a betsheet table created for you
      </Card.Text>
      <Card.Text>
        Create table:
        <Link to={`/predictions/:${profile.username}`}>
          by {profile.username}
        </Link>
      </Card.Text>
    </Card.Body>
  </Card>
);

export default CreateBettingProfile;
