import React, { useState, useEffect } from 'react';

import axios from 'axios';

import GlobalLoading from '../common/GlobalLoading';
import Profile from './Profile';
import Statistics from './Statistics';

import CreateBettingProfile from './CreateBettingProfile';

const Dashboard = ({ match }) => {
  const [profile, setProfile] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBets, setLoadingBets] = useState(true);
  const [bets, setBets] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/users/all/:${match.params.id}`)
      .then(res => {
        console.log(res.data);
        setProfile(res.data.user);
        setLoadingUser(false);
        axios
          .get(`/api/bets/loadbets/${res.data.user.sheet_id}`)
          .then(res => {
            setLoadingBets(false);
            setBets(res.data.bets);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      {!loadingBets && bets && bets.length > 0 ? (
        <Statistics profile={profile} bets={bets} />
      ) : !bets ? (
        <CreateBettingProfile profile={profile} />
      ) : (
        <GlobalLoading />
      )}
      {!loadingUser ? <Profile profile={profile} /> : <GlobalLoading />}
    </>
  );
};

export default Dashboard;
