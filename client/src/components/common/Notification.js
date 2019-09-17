import React, { useState, useEffect } from 'react';

// Styles
import './Notification.scss';
// Bootstrap
import Toast from 'react-bootstrap/Toast';

const Notification = ({ text, remove, i }) => {
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    console.log(i);
    remove(i);
    console.log('close');
    setShow(!show);
  };

  return (
    <Toast className="notificationz" show={show} onClose={() => toggleShow()}>
      <Toast.Header>
        <span className="notification-text">
          <i
            style={{ fontSize: '10px', color: 'black' }}
            className="fas fa-circle-notch"
          ></i>
          <strong className="mr-auto">Bets</strong>
        </span>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

export default Notification;
