import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// Styles
import { rightAlignRow, centeredFullWidthColumn } from '../common/CommonStyles';

// Components
import Card from 'react-bootstrap/Card';
import Setting from './Setting';
import PrettyButton from '../common/PrettyButton';
import Notification from '../common/Notification';
import GlobalLoading from '../common/GlobalLoading';

const Profile = ({ profile, applySettings, currentSettings }) => {
  const [settings, setSettings] = useState({});
  const [notifications, setNotifications] = useState([]);

  const handleChange = (name, value) => {
    setSettings({ ...settings, [name]: value });
  };

  const handleSumbit = () => {
    applySettings(settings);
    notify('Settings updated');
  };

  const notify = text => {
    setNotifications([...notifications, text]);
    setTimeout(() => remove(0), 1000);
  };

  const remove = i => {
    const element = document.getElementsByClassName('notificationz');
    setTimeout(() => {
      element[i].parentNode.removeChild(element[i]);
      notifications.splice(i, 1);
    }, 50);
    setTimeout(() => setNotifications([...notifications]), 500);
  };

  const displayNotifications = () => {
    return notifications.map((notification, i) => (
      <div key={i}>
        <Notification
          text={notification}
          remove={remove}
          i={i}
          component="Settings"
        />
      </div>
    ));
  };

  return (
    <>
      {typeof currentSettings.predictions !== 'undefined' ? (
        <div style={centeredFullWidthColumn}>
          <div className="settings mt-2" style={{ width: '90%' }}>
            Don't allow other people to view:
            <Setting
              text="My bets and statistics"
              toggleId="1"
              handleChange={handleChange}
              name="bets"
              currentSetting={currentSettings.bets}
            />
            <Setting
              text="My profile"
              toggleId="2"
              handleChange={handleChange}
              name="profile"
              currentSetting={currentSettings.profile}
            />
            <Setting
              text="My predictions"
              toggleId="3"
              handleChange={handleChange}
              name="predictions"
              currentSetting={currentSettings.predictions}
            />
          </div>
          <div className="settings mt-5" style={{ width: '90%' }}>
            Don't allow other people to view:
            <Setting
              text="My bets and statistics"
              toggleId="4"
              handleChange={handleChange}
              name="bets"
            />
            <Setting
              text="My profile"
              toggleId="5"
              handleChange={handleChange}
              name="profile"
            />
            <Setting
              text="My predictions"
              toggleId="6"
              handleChange={handleChange}
              name="predictions"
            />
          </div>
          <div aria-live="polite" aria-atomic="true">
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
              id="notification-wrapper"
            >
              {displayNotifications()}
            </div>
          </div>
          <div style={rightAlignRow} className="mt-4">
            <PrettyButton
              className="purple-border mb-3"
              variant="outline-primary"
              style={{
                width: 'auto',
                display: 'flex',
                alignItems: 'center',
                minHeight: 'auto',
                color: '#6f42c1'
              }}
              onclick={() => handleSumbit()}
              text="Save"
            />{' '}
          </div>
        </div>
      ) : (
        <GlobalLoading />
      )}
    </>
  );
};

export default Profile;
