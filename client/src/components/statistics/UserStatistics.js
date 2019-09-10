import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './UserStatistics.scss';

import ByCountry from './Charts/ByCountry';

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

  const statistifyData = (data, type) => {
    let countryObj = {};
    const countries = data.map(bet => {
      countryObj = { ...countryObj, [bet.country]: 0 };
      return bet.country;
    });

    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const count = (array, value) => {
      return array.filter(v => v === value).length;
    };

    const betOnCountryAmount = countries
      .filter(unique)
      .map(b => {
        return { x: b, y: count(countries, b) };
      })
      .sort((a, b) => a.y - b.y);

    console.log(betOnCountryAmount);
    if (type === 'data') {
      return betOnCountryAmount;
    } else if (type === 'labels') {
      let sortedCountries = [];
      betOnCountryAmount.map(b => {
        sortedCountries.push(b.x);
      });
      return sortedCountries;
    }
    return;
  };

  return (
    <div className="statistics-section">
      <ByCountry statistifyData={statistifyData} bets={bets} />
      <ByCountry statistifyData={statistifyData} bets={bets} />
      <ByCountry statistifyData={statistifyData} bets={bets} />
      <ByCountry statistifyData={statistifyData} bets={bets} />
      <ByCountry statistifyData={statistifyData} bets={bets} />
      <ByCountry statistifyData={statistifyData} bets={bets} />
    </div>
  );
};

export default UserStatistics;
