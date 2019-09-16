import React from 'react';

const FameCard = ({ data, username, color }) => (
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
);

export default FameCard;
