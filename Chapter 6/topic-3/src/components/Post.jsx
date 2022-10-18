import React from "react";
import { Card } from "react-bootstrap";

const Post = ({ post }) => {
  const { title, body } = post;

  return (
    <Card>
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
