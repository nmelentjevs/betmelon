import React, { useState, useEffect } from 'react';

import FameCard from './FameCard';

import './HallOfFame.scss';

import FamePart from './FamePart';

import axios from 'axios';
import GlobalLoading from '../common/GlobalLoading';

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
          <FamePart
            data="win_ratio"
            FameCard={FameCard}
            users={users}
            title="Win ratio"
          />
        </div>
        <div className="ratio-section ratio-section-total">
          <FamePart
            data="total_bets"
            FameCard={FameCard}
            users={users}
            title="Total bets"
          />
        </div>
        <div className="ratio-section ratio-section-profit">
          <FamePart
            data="total_wins"
            FameCard={FameCard}
            users={users}
            title="Total wins"
          />
        </div>
        <div className="ratio-section ratio-section-activity">
          <FamePart
            data="registered_on"
            FameCard={FameCard}
            users={users}
            title="Earliest birds"
          />
        </div>
      </div>
    </div>
  ) : (
    <GlobalLoading />
  );
};

export default HallOfFame;
