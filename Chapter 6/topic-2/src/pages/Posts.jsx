import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Post from "../components/Post";
import logo from "../logo.svg";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    })();
  }, []);

  return (
    <Container>
      <Row className="my-4">
        {posts.length === 0 ? (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Loading...</h1>
          </>
        ) : (
          posts.map((post) => (
            <Col key={post.id} md={4} className="my-2">
              <Post post={post} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Posts;
