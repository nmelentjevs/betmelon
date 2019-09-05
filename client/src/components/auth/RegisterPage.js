import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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
          : console.log('Something went wrong')
      )
      .then(err => console.log(err));
  };

  const handleOnChange = event => {
    let { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Form onSubmit={e => handleSubmit(e)}>
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
    </>
  );
};

export default RegisterPage;
