import React from 'react';
import './MainContent.scss';
import SectionDemo from '../section-demo/SectionDemo';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

const MainContent = ({ state }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Row className="mb-4">
        <Jumbotron style={{ width: '100%', background: 'transparent' }}>
          <SectionDemo />
        </Jumbotron>
      </Row>
      <Row className="text-center">
        <Col> Use graphs and metrics to track your most profitable bets</Col>
        <Col> Have all the statistics in one place</Col>
        <Col>Track your bankroll and net profits</Col>
      </Row>
    </div>
  );
};

export default MainContent;
