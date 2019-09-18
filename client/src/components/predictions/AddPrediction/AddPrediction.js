import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';

const AddPrediction = ({
  handleSubmit,
  state,
  handleOnChange,
  country,
  setCountry,
  leagues,
  setLeague,
  displayLeague,
  setAnonymous
}) => {
  function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  const [isLoading, setLoading] = useState(false);

  let [added, setAdded] = useState(false);

  useEffect(() => {
    // TODO: CHANGE TO ADD REQUEST
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        setAdded(true);
        setTimeout(() => (added = false), 2250);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Form
      onSubmit={e => {
        handleClick();
        handleSubmit(e, state);
      }}
      className="prediction-form"
    >
      <Form.Group>
        <Form.Label>Bet Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="e.g. Barcelona takes on Real on Camp Nou"
          onChange={e => handleOnChange(e)}
          id="title"
        />
        <Form.Text className="text-muted">
          Please be considerate and don't use swear language/racist slang.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Bet Prediction</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="prediction"
          onChange={e => handleOnChange(e)}
          id="text"
          placeholder="e.g. Barcelona easy win"
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} md="3">
          <Form.Label>Country</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">1</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
              as="select"
              type="text"
              defaultValue={country}
              aria-describedby="inputGroupPrepend"
              name="Country"
              required
              id="country"
              onChange={e => setCountry(e.target.value)}
            >
              <option>England</option>
              <option>France</option>
              <option>Germany</option>
              <option>Italy</option>
              <option>Spain</option>
              <option>Europe</option>
              <option>National</option>
            </Form.Control>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>League</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="select"
              type="text"
              defaultValue={leagues[0][0]}
              aria-describedby="inputGroupPrepend"
              name="League"
              id="league"
              required
              onChange={e => setLeague(e.target.value)}
            >
              {displayLeague(country)}
            </Form.Control>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>Odds</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              placeholder="6,9"
              aria-describedby="inputGroupPrepend"
              name="odds"
              id="odds"
              required
              onChange={e => handleOnChange(e)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>Amount</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">*</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              placeholder="100"
              aria-describedby="inputGroupPrepend"
              required
              name="amount"
              id="amount"
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
        <Form.Group onClick={e => setAnonymous(e.target.checked)}>
          <Form.Check
            type="checkbox"
            label="Post Anonymously"
            onClick={e => setAnonymous(e.target.checked)}
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
          disabled={isLoading}
        >
          {isLoading ? (
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
          {added ? 'PREDICTION ADDED!' : !isLoading ? 'SUBMIT' : 'LOADING...'}
        </Button>
      </div>
    </Form>
  );
};

AddPrediction.propTypes = {
  handleSubmit: PropTypes.func,
  state: PropTypes.object,
  handleOnChange: PropTypes.func,
  country: PropTypes.string,
  setCountry: PropTypes.func,
  leagues: PropTypes.array,
  setLeague: PropTypes.func,
  displayLeague: PropTypes.func,
  setAnonymous: PropTypes.func
};

export default AddPrediction;
