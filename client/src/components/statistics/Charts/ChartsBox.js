import React, { useState } from 'react';

import Charts from './Charts';
import Overall from './Overall';

import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import SliderPage from '../../common/Slider';

const ChartsBox = ({
  statCountry,
  statOdds,
  statLeague,
  statResult,
  statDates,
  bets,
  username
}) => {
  const [type, setType] = useState('country');
  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#country">
        <Row>
          <Col sm={12} lg={2} className="text-center">
            <ListGroup>
              <ListGroup.Item
                variant="secondary"
                action
                href="#country"
                onClick={() => setType('country')}
              >
                Country
              </ListGroup.Item>
              <ListGroup.Item
                variant="secondary"
                action
                href="#league"
                onClick={() => setType('league')}
              >
                League
              </ListGroup.Item>
              <ListGroup.Item variant="secondary" action href="#overall">
                Overall
              </ListGroup.Item>
              <SliderPage />
            </ListGroup>
          </Col>
          <Col sm={12} lg={10}>
            {bets.length > 0 ? (
              <Tab.Content>
                <Tab.Pane eventKey="#country">
                  <Charts
                    type={type}
                    statFunction={statCountry}
                    resultFunction={statResult}
                    oddsFunction={statOdds}
                    bets={bets}
                    username={username}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="#league">
                  <Charts
                    type={type}
                    statFunction={statLeague}
                    resultFunction={statResult}
                    username={username}
                    oddsFunction={statOdds}
                    bets={bets}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="#overall">
                  <Overall
                    username={username}
                    bets={bets}
                    datesFunction={statDates}
                  />
                </Tab.Pane>
              </Tab.Content>
            ) : (
              'Loading'
            )}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ChartsBox;
