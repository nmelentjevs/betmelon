import React from 'react';

import Table from 'react-bootstrap/Table';
import BetRow from '../bet-row/BetRow';
import './BetTable.scss';

const BetTable = ({ bets, sheet_id }) => {
  const displayBets = () => {
    const betsArray = bets.map((bet, i) => {
      return <BetRow key={i} bet={bet} index={i} sheet_id={sheet_id} />;
    });
    return betsArray;
  };
  return (
    <>
      {
        <Table striped bordered hover size="sm" style={{ maxWidth: '100vw' }}>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>#</th>
              <th>Date</th>
              <th>Country</th>
              <th>Home vs Away</th>
              <th>Bet</th>
              <th>Type</th>
              <th>Odds</th>
              <th>Score</th>
              <th>Result</th>
              <th>Amount</th>
              <th>Profit</th>
              <th>Bankroll</th>
              <th>D/W</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{displayBets()}</tbody>
        </Table>
      }
    </>
  );
};

export default BetTable;
