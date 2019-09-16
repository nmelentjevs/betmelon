import React from 'react';

import moment from 'moment';

const FamePart = ({ data, users, FameCard, title, mock }) => (
  <ul>
    <h4>{title}</h4>
    {users
      .filter(u => u[`${data}`] != null)
      .sort((a, b) => {
        if (data !== 'registered_on') {
          return b[`${data}`] - a[`${data}`];
        } else {
          return moment(a[data]).diff(moment(b[data]));
        }
      })
      .filter((u, i) => i < 5)
      .map((u, i) => (
        <FameCard
          key={i}
          data={`${
            data === 'win_ratio'
              ? u[`${data}`] * 100
              : data === 'registered_on'
              ? moment(u[data]).format('DD MMM YYYY')
              : u[data]
          }${data === 'win_ratio' ? '%' : ''}`}
          username={u.username}
          mock={mock}
        />
      ))}
  </ul>
);

export default FamePart;
