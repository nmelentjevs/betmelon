import React, { useState } from 'react';

import PropTypes from 'prop-types';

// Styles

import { centeredFullWidthRow } from '../../common/CommonStyles';

// Bootstrap
import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

// Components
import GlobalLoading from '../../common/GlobalLoading';
import SliderPage from '../../common/Slider';
import Charts from './Charts';
import Overall from './Overall';

const ChartsBox = ({
  statCountry,
  statOdds,
  statLeague,
  statResult,
  statDates,
  bets,
  username,
  loading
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
            {bets.length > 0 && !loading ? (
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
                    oddsFunction={statOdds}
                    bets={bets}
                    username={username}
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
            ) : bets.length === 0 && !loading ? (
              <>
                <div style={centeredFullWidthRow}>
                  Please add bets first to see statistics
                </div>
                <div style={centeredFullWidthRow}>
                  Graphs are hungry and sad without any information to feed :(
                </div>
              </>
            ) : (
              <GlobalLoading fullscreen={true} />
            )}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

ChartsBox.propTypes = {
  statCountry: PropTypes.func,
  statOdds: PropTypes.func,
  statLeague: PropTypes.func,
  statResult: PropTypes.func,
  statDates: PropTypes.func,
  bets: PropTypes.array,
  username: PropTypes.string,
  loading: PropTypes.bool
};

export default ChartsBox;
