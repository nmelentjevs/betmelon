import React from 'react';

import PropTypes from 'prop-types';

// Styles
import './BetTable.scss';
// Bootstrap
import Table from 'react-bootstrap/Table';
// Components
import Bet from '../bet/Bet';

const BetDisplay = ({ bets, username, refreshBets }) => {
  const displayBets = () => {
    const betsArray = bets.map((bet, i) => {
      return (
        <Bet
          key={i}
          bet={bet}
          index={i}
          username={username}
          refreshBets={refreshBets}
        />
      );
    });
    return betsArray;
  };
  return <>{displayBets()}</>;
};

BetDisplay.propTypes = {
  bets: PropTypes.array,
  username: PropTypes.string,
  refreshBets: PropTypes.func
};

export default BetDisplay;
