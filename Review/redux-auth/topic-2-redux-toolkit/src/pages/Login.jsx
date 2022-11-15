import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import GoogleLogin from "../components/GoogleLogin";
import { login, logout } from "../redux/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        email,
        password,
      };
      dispatch(login(data));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header className="App-header">
        <Container>
          <Row>
            <Col>
              {!token ? (
                <>
                  <GoogleLogin label="Login with Google" />
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </>
              ) : (
                <div className="d-grid gap-2">
                  <Button variant="danger" size="lg" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Login;
