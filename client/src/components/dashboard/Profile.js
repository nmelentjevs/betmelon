import React from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const Profile = ({ profile }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{profile.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          a.k.a. {profile.username}{' '}
        </Card.Subtitle>
        <Card.Text>Profile description, moto, comments</Card.Text>
        <Card.Text>
          Check predictions:{' '}
          <Link to={`/predictions/:${profile.username}`}>
            by {profile.username}
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Profile;
