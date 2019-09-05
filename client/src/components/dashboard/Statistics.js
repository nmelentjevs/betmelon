import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const Statistics = ({ bets, profile }) => {
  const [statistics, setStatistics] = useState({
    winRatio: 0,
    loses: 0,
    wins: 0,
    return: 0
  });
  useEffect(() => {
    console.log(bets);

    bets.map(bet => {
      console.log(bet[8]);
      if (bet[8] === ('Win' || '1')) {
        setStatistics({
          ...statistics,
          wins: (statistics.wins += 1)
        });
      } else if (bet[8] === ('Return' || '0')) {
        setStatistics({ ...statistics, return: (statistics.return += 1) });
      } else if (bet[8] === ('Lose' || '-1')) {
        setStatistics({ ...statistics, loses: (statistics.loses += 1) });
      }
    });
  }, []);

  return (
    <Card style={{ width: '18rem' }} className="mb-2">
      <Card.Body>
        <Card.Title>All-time record</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Wins: {statistics.wins} | Returns: {statistics.return} | Loses:{' '}
          {statistics.loses}
        </Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Text>
          Check bets: <Link to={`/bets/${profile.sheet_id}`}>Betsheet</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Statistics;
