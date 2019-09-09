import React from 'react';

import Table from 'react-bootstrap/Table';
import Bet from '../bet/Bet';
import './BetTable.scss';

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

export default BetDisplay;
