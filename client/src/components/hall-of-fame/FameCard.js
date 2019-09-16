import React from 'react';

import { Link } from 'react-router-dom';

const FameCard = ({ data, username, mock, color }) => (
  <Link
    to={!mock ? `/bets/${username}` : '#'}
    style={{ color: 'white' }}
    className="bar-anchor"
  >
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
    <div className="transition-bar"> </div>
  </Link>
);

export default FameCard;
