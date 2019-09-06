import React, { useState, useEffect } from 'react';

import axios from 'axios';
import BetTable from './bet-table/BetTable';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import { UserContext } from '../../userContext';
import GlobalLoading from '../common/GlobalLoading';

const Bets = ({ state: { state }, match, history }) => {
  const bet = [];
  const [bets, setBets] = useState([]);
  const [show, toggleShow] = useState(true);

  const [loading, setLoading] = useState(true);
  const [created, setCreated] = useState(true);
  const [creating, setCreating] = useState(false);

  let [home, setHome] = useState('');
  let [away, setAway] = useState('');

  const valueArray = [
    '',
    'Date',
    'Country',
    '',
    'Bet',
    'Bet Type',
    'Odds',
    'Score',
    'Result',
    'Amount'
  ];

  useEffect(() => {
    if (state.isAuthenticated) {
      const { sheet_id } = match.params;
      setLoading(true);

      axios
        .get(`/api/bets/loadbets/${sheet_id}`)
        .then(res => {
          console.log(res.data);
          setLoading(false);
          if (res.data.msg !== 'No entries found') {
            if (res.data.bets.length !== 0) {
              setBets(res.data.bets);
              setCreated(false);
            }
          }
        })
        .catch(err => console.log(err));
    }
  }, [creating]);

  useEffect(() => {}, [bets]);

  const addBet = e => {
    handleClick();
    console.log(bet);
    e.preventDefault();

    valueArray.map(name => {
      if (name === 'Home') {
        setHome(document.getElementById(name).value);
      } else if (name === 'Away') {
        setAway(document.getElementById(name).value);
      } else if (valueArray.includes(name) && name !== '') {
        bet[valueArray.indexOf(name)] = document.getElementById(name).value;
      }
    });

    bet[0] = bets.length;
    bet[3] = `${home} vs ${away}`;
    bet[10] = '*';
    bet[11] = '*';
    bet[12] = '*';
    const { sheet_id } = state.user;

    axios
      .post(`/api/bets/addbet/${sheet_id}`, bet)
      .then(res => {
        setBets(res.data.bets);
        setTimeout(() => setAdded(true), 2500);
      })
      .catch(err => console.log(err));
  };

  const createNewSheet = setSheetId => {
    setCreating(true);
    console.log('Creating new sheet');
    const { username } = state.user;
    axios
      .post('/api/bets/create_sheet', { username })
      .then(res => {
        setCreating(false);
        setSheetId(res.data.sheet);
        history.push(`/empty`);
        history.replace(`/bets/${res.data.sheet}`);
      })
      .catch(err => console.log(err));
  };

  const handleOnChange = event => {
    let { name, value } = event.target;

    if (name === 'Home') {
      setHome(value);
    } else if (name === 'Away') {
      setAway(value);
    } else if (valueArray.includes(name)) {
      bet[valueArray.indexOf(name)] = value;
    }
    console.log(bet);
  };

  function simulateNetworkRequest() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
      setTimeout(() => setAdded(true), 2250);
    });
  }

  const [isButtonLoading, setButtonLoading] = useState(false);

  let [added, setAdded] = useState(false);

  useEffect(() => {
    // TODO: CHANGE TO ADD REQUEST
    if (isButtonLoading) {
      simulateNetworkRequest().then(() => {
        setButtonLoading(false);
        setAdded(false);
      });
    }
  }, [isButtonLoading]);

  const handleClick = () => setButtonLoading(true);

  return loading ? (
    <GlobalLoading fullscreen={true} />
  ) : !created ? (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row'
        }}
      >
        <Button
          className="mb-2"
          variant="outline-primary"
          onClick={() => toggleShow(!show)}
        >
          {!show ? 'ADD ' : 'CLOSE '}
          {!show ? (
            <i className="fas fa-plus" />
          ) : (
            <i className="fas fa-minus" />
          )}
        </Button>
      </div>
      {show ? (
        <Form noValidate onSubmit={e => addBet(e)}>
          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Home team</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Barcelona"
                name="Home"
                id="Home"
                onChange={e => handleOnChange(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Away team</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Real Madrid"
                name="Away"
                id="Away"
                onChange={e => handleOnChange(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Country(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
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
              <Form.Label>Match Date(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">*</InputGroup.Text>
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
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Bet</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="2"
                name="Bet"
                id="Bet"
                onChange={e => handleOnChange(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Bet Type(optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="AH(-2)"
                name="Bet Type"
                id="Bet Type"
                onChange={e => handleOnChange(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Score(optional)</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
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
                  <InputGroup.Text id="inputGroupPrepend">*</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="28.09.2018"
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
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Result(1/0/-1) or (Win/Return/Lose)</Form.Label>
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
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Bet Amount</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
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
              <Form.Control
                type="text"
                placeholder="Amazing game"
                name="Comments"
                id="Comments"
                onChange={e => handleOnChange(e)}
              />
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
        <></>
      )}
      {bets.length > 0 ? (
        <BetTable bets={bets} sheet_id={match.params.sheet_id} />
      ) : (
        <GlobalLoading />
      )}
    </div>
  ) : !creating ? (
    <UserContext.Consumer>
      {({ state, setSheetId }) => (
        <Button
          className="mb-2"
          variant="outline-primary"
          onClick={() => createNewSheet(setSheetId)}
        >
          Click To Create New Betsheet
        </Button>
      )}
    </UserContext.Consumer>
  ) : (
    <>
      <div>Creating...</div>
      <GlobalLoading fullscreen={true} />
    </>
  );
};

export default Bets;
