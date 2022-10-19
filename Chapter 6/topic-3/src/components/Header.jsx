import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header({ token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            setToken(null);
            navigate.push("/");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!token ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/posts">
                  <Nav.Link>Posts</Nav.Link>
                </LinkContainer>
                <Nav.Link href="/logout" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
