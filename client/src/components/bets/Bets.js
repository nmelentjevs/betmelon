import React, { useState, useEffect } from 'react';

import axios from 'axios';
import BetDisplay from './bet-display/BetDisplay';

import './Bets.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import FilterButton from '../common/FilterButton';

import GlobalLoading from '../common/GlobalLoading';

const Bets = ({ state: { state }, match, history }) => {
  let [filter, setFilter] = useState('');
  const bet = [];
  const [bets, setBets] = useState([]);
  const [show, toggleShow] = useState(false);

  const [loading, setLoading] = useState(true);

  let [home, setHome] = useState('');
  let [away, setAway] = useState('');

  useEffect(() => {
    if (state.isAuthenticated) {
      setLoading(true);
      refreshBets();
    }
  }, []);

  useEffect(() => {}, [bets]);

  const refreshBets = () => {
    const { username } = match.params;
    axios
      .get(`/api/bets/loadbets/${username}`)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        if (res.data.msg !== 'No entries found') {
          if (res.data.bets.length !== 0) {
            console.log(res.data.bets);
            setBets(res.data.bets);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const addBet = e => {
    handleClick();
    console.log(bet);
    e.preventDefault();

    const inputs = document.getElementsByTagName('input');
    const fields = [
      'home',
      'away',
      'country',
      'league',
      'match_date',
      'bet',
      'score',
      'imaginary',
      'odds',
      'result',
      'bet_amount',
      'comments',
      'anonymous'
    ];
    console.log(state);

    const {
      user: { username }
    } = state;
    let betObj;
    let i = 0;
    while (i < inputs.length) {
      if (i !== 12) {
        betObj = { ...betObj, [fields[i]]: inputs[i].value };
      } else {
        betObj = { ...betObj, [fields[i]]: inputs[i].checked };
      }
      i++;
    }
    console.log(betObj);

    axios
      .post(`/api/bets/addbet/`, { betObj, username })
      .then(res => {
        setBets(res.data.bets);
        setTimeout(() => setAdded(true), 2500);
        setTimeout(() => refreshBets(), 100);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const handleOnChange = event => {
    let { name, value } = event.target;
  };

  function simulateNetworkRequest() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }

  const [isButtonLoading, setButtonLoading] = useState(false);

  let [added, setAdded] = useState(false);

  useEffect(() => {
    // TODO: CHANGE TO ADD REQUEST
    if (isButtonLoading) {
      simulateNetworkRequest().then(() => {
        setButtonLoading(false);
        setTimeout(() => setAdded(false), 2300);
      });
    }
  }, [isButtonLoading]);

  const handleClick = () => {
    setButtonLoading(true);
    setTimeout(() => setAdded(true), 2000);
  };

  const leagues = [
    ['Premier League', 'Championship', 'EFL Cup', 'FA Cup'],
    ['Ligue 1', 'Ligue 2', 'Coupe de la Ligue'],
    ['La Liga', 'Segunda Division', 'Copa Del Rey'],
    ['Bundesliga', '2. Bundesliga', 'DFB Pokal'],
    ['Seria A', 'Seria B', 'Coppa Italia'],
    ['Champions League', 'Europa League'],
    ['World Cup', 'Europe Cup', 'Copa America']
  ];

  const countries = [
    'England',
    'France',
    'Spain',
    'Germany',
    'Italy',
    'Europe',
    'National'
  ];

  return loading ? (
    <GlobalLoading fullscreen={true} />
  ) : (
    <div className="bets-section">
      <div
        className="mt-4 mb-2"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        <FilterButton
          setFilter={setFilter}
          countries={countries}
          leagues={leagues}
          filter={filter}
        />
        <Button
          variant="outline-primary"
          onClick={() => toggleShow(!show)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {!show ? 'ADD ' : 'CLOSE '}
        </Button>
      </div>
      {show ? (
        <Form noValidate onSubmit={e => addBet(e)}>
          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Home team</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-home"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  required
                  type="text"
                  placeholder="Barcelona"
                  name="Home"
                  id="Home"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Away team</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-subway"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  required
                  type="text"
                  placeholder="Real Madrid"
                  name="Away"
                  id="Away"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>{' '}
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Country(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-globe-europe"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Spain"
                  aria-describedby="inputGroupPrepend"
                  name="Country"
                  id="Country"
                  required
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a country.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>League(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-flag"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="La Liga"
                  name="League"
                  id="League"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a country.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Match Date(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    {' '}
                    <i className="fas fa-clock"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="28.09.2018"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="Date"
                  id="Date"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a date.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Bet</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    {' '}
                    <i className="fas fa-ellipsis-h"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  required
                  type="text"
                  placeholder="2"
                  name="Bet"
                  id="Bet"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Score(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-futbol"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="6-2"
                  aria-describedby="inputGroupPrepend"
                  name="Score"
                  id="Score"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a country.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Imaginary(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-flask"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Yes"
                  aria-describedby="inputGroupPrepend"
                  name="Imaginary"
                  id="Imaginary"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a date.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Odds</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-sort-numeric-up-alt"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="2,69"
                  required
                  name="Odds"
                  id="Odds"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide valid odds.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Result(Win/Return/Lose)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-poll-h"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Win"
                  required
                  name="Result"
                  id="Result"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid result.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Bet Amount</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-money-bill-alt"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="100$"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="Amount"
                  id="Amount"
                  onChange={e => handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose an amount.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Comments(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-comment"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Amazing game"
                  name="Comments"
                  id="Comments"
                  onChange={e => handleOnChange(e)}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <Form.Group>
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
              />
            </Form.Group>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <Button
              variant={added ? 'success' : 'outline-primary'}
              type="submit"
              className="mb-2"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ''
              )}
              {added
                ? 'PREDICTION ADDED!'
                : !isButtonLoading
                ? 'SUBMIT'
                : 'LOADING...'}
            </Button>
          </div>
        </Form>
      ) : (
        <> </>
      )}
      {bets.length > 0 ? (
        <BetDisplay
          refreshBets={refreshBets}
          bets={bets.sort((a, b) => b.id - a.id)}
          username={match.params.username}
        />
      ) : (
        <GlobalLoading />
      )}
    </div>
  );
};

export default Bets;
