import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
            navigate.push("/");
          }
        }
      }
    })();
  }, [token, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>

            {!token ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            ) : (
              <>
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
