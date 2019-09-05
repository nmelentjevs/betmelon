import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import { UserContext } from '../../userContext';

const LoginPage = ({ history }) => {
  const [user, setUser] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleSubmit = (e, authenticate) => {
    e.preventDefault();

    const { password, username } = user;
    axios
      .post('/api/users/login', { password, username })
      .then(res => {
        if (res.data.err === 'username') {
          setUsernameError(true);
        } else if (res.data.login) {
          authenticate(res.data.user);
          localStorage.setItem('username', res.data.user.username);
          history.push('/');
        } else if (!res.data.login) {
          setPasswordError(true);
        }
      })
      .catch(err => console.log(err));
  };

  const handleOnChange = event => {
    let { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <UserContext.Consumer>
      {({ state, authenticate }) => (
        <Form onSubmit={e => handleSubmit(e, authenticate)}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={e => handleOnChange(e)}
              className={usernameError ? 'is-invalid' : ''}
            />
            <small
              style={{ display: !usernameError ? 'none' : 'block' }}
              id="passwordHelp"
              className="text-danger"
            >
              User not found
            </small>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="inputPassword">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={e => handleOnChange(e)}
              id="inputPassowrd"
              className={passwordError ? 'is-invalid' : ''}
            />
            <small
              style={{ display: !passwordError ? 'none' : 'block' }}
              id="passwordHelp"
              className="text-danger"
            >
              Incorrect Password
            </small>
            <Form.Text className="text-muted">
              Passwords are encrypted
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          or
          <Link to="/register">
            <Button variant="warning" type="submit">
              Register
            </Button>
          </Link>
        </Form>
      )}
    </UserContext.Consumer>
  );
};

export default LoginPage;
