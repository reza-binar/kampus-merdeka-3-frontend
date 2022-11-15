import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { me, logout } from "../redux/actions/authActions";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(
          me((status) => {
            if (status === 401) {
              navigate("/");
            }
          })
        );
      }
    })();
  }, [token, navigate, dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
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
            <LinkContainer to="/todos">
              <Nav.Link>Todos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/userstodos">
              <Nav.Link>Users Todos</Nav.Link>
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
