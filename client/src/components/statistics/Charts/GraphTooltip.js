import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const GraphTooltip = ({ x, y, orientation, datum, bets }) => {
  const [loading, setLoading] = useState(true);

  let [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (parseInt(datum.x.split('+')[0]) === 5) {
      setFiltered(
        bets.filter(bet => parseInt(datum.x.split('+')[0]) <= bet.odds)
      );
    } else {
      setFiltered(
        bets.filter(
          bet =>
            parseInt(datum.x.split('-')[0]) <= bet.odds &&
            bet.odds <= parseInt(datum.x.split('-')[1])
        )
      );
    }
  }, [bets]);

  return bets.length > 0 ? (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject x={x - 50} y={y - 50} width="150" height="100%">
        <div
          className="graph-tooltip"
          style={{
            backgroundColor: 'white',
            fontSize: '10px'
          }}
        >
          <Card
            style={{
              width: 'auto'
            }}
          >
            <ListGroup variant="flush">
              {filtered.map(bet => (
                <ListGroup.Item
                  variant="dark"
                  style={{
                    height: '20px',
                    fontSize: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {bet.teams}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
      </foreignObject>
    </g>
  ) : (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject x={x - 50} y={y - 50} width="150" height="100%">
        <div
          className="graph-tooltip"
          style={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner animation="border" role="status"></Spinner>
        </div>
      </foreignObject>
    </g>
  );
};

export default GraphTooltip;
