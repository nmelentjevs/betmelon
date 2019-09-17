import React, { useState, useEffect } from 'react';

import axios from 'axios';

import {
  statLeague,
  statCountry,
  statResult,
  statOdds,
  statDates
} from './helper-statistics';

// Styles
import './UserStatistics.scss';

// Components
import ChartsBox from './Charts/ChartsBox';
import StatBox from './Charts/StatBox';
import ByWinPercentage from './Charts/ByWinPercentage';

const UserStatistics = ({ state: { state }, match }) => {
  const [bets, setBets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.isAuthenticated) {
      setLoading(true);
      refreshBets();
    }
  }, []);

  useEffect(() => {}, [bets, setBets]);

  const refreshBets = () => {
    const { username } = match.params;
    axios
      .get(`/api/bets/loadbets/${username}`)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        if (res.data.msg !== 'No entries found') {
          if (res.data.bets.length !== 0) {
            console.log(res.data.bets);
            setBets(res.data.bets);
          }
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="statistics-section">
      {/* <button onClick={() => console.log(statDates(bets))}>Ok </button> */}
      <ChartsBox
        statResult={statResult}
        statCountry={statCountry}
        statOdds={statOdds}
        statLeague={statLeague}
        statDates={statDates}
        bets={bets}
        username={match.params.username}
        loading={loading}
      />
    </div>
  );
};

export default UserStatistics;
