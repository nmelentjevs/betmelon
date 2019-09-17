import React, { useState } from 'react';

import axios from 'axios';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Containers

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password, rpassword, username, fname } = user;
    axios
      .post('/api/email/register', {
        email,
        password,
        rpassword,
        username,
        name: fname
      })
      .then(res =>
        res.data.msg === 'Success'
          ? history.push('/login')
          : res.data.msg === 'User Exists'
          ? console.log('User Exists')
          : console.log('Something went wrong')
      )
      .then(err => console.log(err));
  };

  const handleOnChange = event => {
    let { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Form
        onSubmit={e => handleSubmit(e)}
        style={{ width: '500px', marginBottom: '200px', color: 'white' }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={e => handleOnChange(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => handleOnChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            placeholder="Full Name"
            onChange={e => handleOnChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={e => handleOnChange(e)}
          />
          <Form.Text className="text-muted">Passwords are encrypted</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            name="rpassword"
            placeholder="Repeat password"
            onChange={e => handleOnChange(e)}
          />
          <Form.Text className="text-muted">Repeat password</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
