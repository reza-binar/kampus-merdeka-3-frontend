import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);

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
      try {
        const result = await axios.post(
          "https://topic-auth-2-backend.herokuapp.com/api/v1/auth/register",
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      // Send access token to backend
      console.log(response);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div>
      <header className="App-header">
        <Container>
          <Row>
            <Col>
              {!token ? (
                <>
                  <div className="d-grid">
                    <div className="m-auto">
                      <Button variant="primary" onClick={googleLogin}>
                        <FontAwesomeIcon icon={faGoogle} /> Register with Google
                      </Button>
                    </div>
                  </div>

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

export default Register;
