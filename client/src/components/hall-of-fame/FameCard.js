import React from 'react';

import { Link } from 'react-router-dom';

const FameCard = ({ data, username, color }) => (
  <Link to={`/bets/${username}`} style={{ color: 'white' }}>
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: '5px'
      }}
    >
      <span>{username}</span>
      <span>{data}</span>
    </li>
  </Link>
);

export default FameCard;
