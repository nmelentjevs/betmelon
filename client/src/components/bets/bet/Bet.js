import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './BetRow.scss';

import axios from 'axios';

import Moment from 'react-moment';

const Bet = ({ bet, username, refreshBets }) => {
  const [edit, setEdit] = useState(false);
  const [deleteState, setDelete] = useState(false);
  let [currentEdit, setCurrentEdit] = useState([]);
  let [currentDelete, setCurrentDelete] = useState([]);

  useEffect(() => {}, []);

  const editBet = () => {
    let result = document.getElementById('result').value;
    let score = document.getElementById('score').value;
    let league = document.getElementById('league').value;
    let country = document.getElementById('country').value;
    let odds = document.getElementById('odds').value;
    let betType = document.getElementById('bet').value;

    currentEdit = {
      ...currentEdit,
      country,
      league,
      odds,
      bet: betType,
      result,
      score
    };
    axios
      .post('/api/bets/updatebet', { bet: currentEdit, id: bet.id })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setEdit(false);
    setTimeout(() => refreshBets(), 100);
  };

  const deleteBet = () => {
    console.log('Sending delete request');
    axios
      .post('/api/bets/deletebet', {
        username,
        id: bet.id
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setDelete(false);
    setTimeout(() => refreshBets(), 100);
  };

  return edit ? (
    <Card
      className="text-center mb-3 bet-card"
      border={
        edit
          ? 'primary'
          : bet.result.match('^W') || bet.result === '1'
          ? 'success'
          : 'danger'
      }
    >
      <Card.Body className="bet-card-body">
        {deleteState ? (
          <>
            <button
              className="button-action button-delete-confirm"
              onClick={() => {
                console.log('confirm delete');
                deleteBet(currentDelete);
              }}
            >
              <i className="fas fa-trash"></i>
            </button>
            <button
              className="button-action button-save"
              onClick={() => {
                editBet(currentEdit);
              }}
            >
              <i className="fas fa-check"></i>
            </button>
          </>
        ) : (
          ''
        )}

        <Card.Title className="mb-4 bet-card-title">{bet.teams}</Card.Title>
        <Row>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-poll"></i>
              <input
                id="result"
                style={{ textAlign: 'center' }}
                defaultValue={bet.result}
              ></input>
            </Card.Text>
          </Col>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-futbol"></i>
              <input
                id="score"
                style={{ textAlign: 'center' }}
                defaultValue={bet.score}
              ></input>
            </Card.Text>
          </Col>

          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="far fa-flag"></i>
              <input
                id="league"
                style={{ textAlign: 'center' }}
                defaultValue={bet.league}
              ></input>
            </Card.Text>
          </Col>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-globe-americas"></i>
              <input
                id="country"
                style={{ textAlign: 'center' }}
                defaultValue={bet.country}
              ></input>
            </Card.Text>
          </Col>

          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-ellipsis-h"></i>
              <input
                id="bet"
                style={{ textAlign: 'center' }}
                defaultValue={bet.bet}
              ></input>
            </Card.Text>
          </Col>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-sort-numeric-up-alt"></i>
              <input
                id="odds"
                style={{ textAlign: 'center' }}
                defaultValue={bet.odds}
              ></input>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer
        className="text-muted bet-footer"
        style={{
          height: '30px'
        }}
      >
        <p className="moment-date">
          <Moment format="D MMM YYYY">{bet.date_added}</Moment> at{' '}
          <Moment format="hh:mm">{bet.date_added}</Moment>
        </p>
      </Card.Footer>
    </Card>
  ) : (
    <Card
      className="text-center mb-3 bet-card"
      border={
        bet.result.match('^W') || bet.result === '1' ? 'success' : 'danger'
      }
    >
      <Card.Body className="bet-card-body">
        {deleteState ? (
          <button
            className="button-action button-delete-confirm"
            onClick={() => {
              console.log('confirm delete');
              deleteBet(currentDelete);
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        ) : (
          <button
            className="button-action button-edit"
            onClick={() => {
              setEdit(true);
              setCurrentEdit(bet);
              setDelete(true);
              setCurrentDelete(bet);
            }}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
        )}

        <Card.Title className="mb-4 bet-card-title">{bet.teams}</Card.Title>
        <Row>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-poll"></i>
              <span>{bet.result}</span>
            </Card.Text>
          </Col>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-futbol"></i>
              <span>{bet.score}</span>
            </Card.Text>
          </Col>

          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="far fa-flag"></i>
              <span>{bet.league}</span>
            </Card.Text>
          </Col>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-globe-americas"></i>
              <span>{bet.country}</span>
            </Card.Text>
          </Col>

          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-ellipsis-h"></i>
              <span>{bet.bet}</span>
            </Card.Text>
          </Col>
          <Col lg={4} sm={6} xs={6} className="mb-2">
            <Card.Text className="bet-field">
              <i className="fas fa-sort-numeric-up-alt"></i>
              <span>{bet.odds}</span>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer
        className="text-muted bet-footer"
        style={{
          height: '30px'
        }}
      >
        <p className="moment-date">
          <Moment format="D MMM YYYY">{bet.date_added}</Moment> |{' '}
          <Moment format="hh:mm">{bet.date_added}</Moment>
        </p>
      </Card.Footer>
    </Card>
  );
};

export default Bet;
