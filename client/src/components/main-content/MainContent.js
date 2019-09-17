import React from 'react';

import { statCountry, statDates } from '../statistics/helper-statistics';
import PropTypes from 'prop-types';

import {
  mockData,
  SampleGraph,
  SampleProfit,
  smallPrediction,
  mockUsers
} from './mockData';

// Styles
import './MainContent.scss';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
// Components
import Prediction from '../predictions/Prediction/Prediction';
import SectionDemo from './section-demo/SectionDemo';
import BetsTree from '../bets/BetTree';
import FamePart from '../hall-of-fame/FamePart';
import FameCard from '../hall-of-fame/FameCard';

const MainContent = ({ state }) => {
  return (
    <div style={{ height: '100vh' }} className="main-page">
      <Row className="mb-12" style={{ marginTop: '50px' }}>
        <Jumbotron
          style={{
            width: '100%',
            background: 'transparent'
          }}
        >
          <SectionDemo />
        </Jumbotron>
      </Row>

      <br />
      <Container style={{}}>
        <Row>
          <Col md={4} sm={12} style={{ marginTop: '20px' }}>
            <h4>Store all your bets in one place</h4>
            <div className="tree-wrapper">
              <BetsTree username={'test'} betFromBets={mockData} mock={true} />
            </div>
          </Col>
          <Col
            md={4}
            sm={12}
            className="text-center"
            style={{ marginTop: '20px' }}
          >
            {' '}
            <h4>Extract statistics and useful metrics</h4>
            <SampleGraph bets={mockData} statFunction={statCountry} />
          </Col>
          <Col
            md={4}
            sm={12}
            className="text-center"
            style={{ marginTop: '20px' }}
          >
            {' '}
            <h4>See most successful betters</h4>
            <div className="mock-ratio-section mock-ratio-section-win">
              <FamePart
                data="win_ratio"
                FameCard={FameCard}
                users={mockUsers}
                title="Win ratio"
                mock={true}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: '50px' }}>
          <Col md={4} sm={12} className="text-center">
            <h4>Read and share predictions with other people</h4>
            <div className="prediction-mock">
              <Prediction data={smallPrediction} mock={true} />
            </div>
          </Col>
          <Col md={4} sm={12} className="text-center">
            <h4>Track your bankroll and net profits</h4>
            <div style={{ marginTop: '-20px' }}>
              <SampleProfit />
            </div>
          </Col>
          <Col md={4} sm={12} className="text-center">
            <h4>Improve your betting patterns and increase net leverage</h4>
            <div className="testimonial-quote group right">
              <div className="quote-img">
                <img src={require('../../static/vlad.jpg')} />
                <cite>
                  <span>Jack White</span>
                  <br />
                  Canadian Sailor
                </cite>
              </div>
              <div className="quote-quote">
                <blockquote>
                  <p>
                    Overall, fantastic! I'd recommend them to anyone looking to
                    improve their betting returns."
                  </p>
                </blockquote>
              </div>
            </div>
          </Col>
        </Row>

        <footer
          className="page-footer font-small special-color-dark pt-4 main-footer"
          style={{ marginTop: '100px' }}
        >
          <ul
            className="list-unstyled list-inline text-center"
            style={{ fontSize: '1.6rem' }}
          >
            <li className="list-inline-item">
              <a
                className="btn-floating btn-fb mx-1"
                href="https://github.com/nmelentjevs"
              >
                <i className="fab fa-github"> </i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-tw mx-1">
                <i className="fab fa-linkedin"> </i>
              </a>
            </li>
          </ul>

          <div className="footer-copyright text-center py-3">
            © 2019 Copyright:
            <a href="https://mdbootstrap.com/education/bootstrap/">
              {' '}
              Betmelon
            </a>{' '}
            by
            <a
              href="https://github.com/nmelentjevs"
              style={{ color: 'salmon' }}
            >
              {' '}
              nmelentjevs
            </a>{' '}
          </div>
        </footer>
      </Container>
    </div>
  );
};

MainContent.propTypes = {
  state: PropTypes.object
};

export default MainContent;
