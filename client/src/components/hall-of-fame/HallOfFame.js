import React, { useState, useEffect } from 'react';

import FameCard from './FameCard';

import moment from 'moment';

import './HallOfFame.scss';

import axios from 'axios';

const HallOfFame = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/users/all/halloffameusers')
      .then(res => {
        console.log(res.data.users);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return users.length > 0 && !loading ? (
    <div className="halloffame mt-4">
      <h1 className="halloffame-heading">Best of the</h1>

      <div className="halloffame-section">
        <div className="ratio-section ratio-section-win">
          <ul>
            <h4>Win ratio</h4>
            {users
              .filter(u => u.win_ratio != null)
              .sort((a, b) => b.win_ratio - a.win_ratio)
              .filter((u, i) => i < 5)
              .map((u, i) => (
                <FameCard
                  key={i}
                  data={`${u.win_ratio * 100}%`}
                  username={u.username}
                />
              ))}
          </ul>
        </div>
        <div className="ratio-section ratio-section-total">
          <ul>
            <h4>Total bets</h4>
            {users
              .filter(u => u.total_bets != null)
              .sort((a, b) => b.total_bets - a.total_bets)
              .filter((u, i) => i < 5)
              .map((u, i) => (
                <FameCard key={i} data={u.total_bets} username={u.username} />
              ))}
          </ul>
        </div>
        <div className="ratio-section ratio-section-profit">
          <ul>
            <h4>Total wins</h4>
            {users
              .filter(u => u.total_wins != null)
              .sort((a, b) => b.total_wins - a.total_wins)
              .filter((u, i) => i < 5)
              .map((u, i) => (
                <FameCard key={i} data={u.total_wins} username={u.username} />
              ))}
          </ul>
        </div>
        <div className="ratio-section ratio-section-activity">
          <ul>
            <h4>Early birds</h4>
            {users
              .filter(u => u.registered_on != null)
              .sort((a, b) =>
                moment.utc(a.registered_on).diff(moment.utc(b.registered_on))
              )
              .filter((u, i) => i < 5)
              .map((u, i) => (
                <FameCard
                  key={i}
                  data={moment(u.registered_on).format('DD MMMM YYYY')}
                  username={u.username}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default HallOfFame;
