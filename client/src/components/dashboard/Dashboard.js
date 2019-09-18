import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './Profile.scss';

// Components
import Statistics from './Statistics';
import GlobalLoading from '../common/GlobalLoading';
import CreateBettingProfile from './CreateBettingProfile';
import Toggle from './Toggle';
import Settings from './Settings';
import ProfileInfo from './ProfileInfo';

const Dashboard = ({ match }) => {
  const [profile, setProfile] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBets, setLoadingBets] = useState(true);
  const [bets, setBets] = useState([]);
  const [initialSettings, setSettings] = useState({});

  useEffect(() => {
    axios
      .get(`/api/users/all/${match.params.id}`)
      .then(res => {
        console.log(res.data);
        setProfile(res.data.user);
        setLoadingUser(false);
        const {
          privacy_bets,
          privacy_predictions,
          privacy_profile
        } = res.data.user;
        setSettings({
          bets: privacy_bets,
          predictions: privacy_predictions,
          profile: privacy_profile
        });
      })
      .catch(err => console.log(err));
  }, [match.params.id]);

  const applySettings = settings => {
    Object.keys(settings).map(s => {
      Object.keys(initialSettings).map(i => {
        if (s === i) {
          initialSettings[s] = settings[i];
        }
      });
    });

    axios
      .post(`/api/users/update/${profile.username}`, { initialSettings })
      .then(res => console.log(res))
      .catch(err => console.logerr);
  };

  return (
    <div className="profile-section">
      <ProfileInfo profile={profile} />
      <Settings
        applySettings={applySettings}
        currentSettings={initialSettings}
      />
    </div>
  );
};

export default Dashboard;
