import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import {
  addMessageFromWebsocket,
  getAllMessages,
} from "../redux/actions/messageActions";
import MessageItem from "../components/MessageItem";
import AddMessage from "../components/AddMessage";

const socket = io(process.env.REACT_APP_WEBSOCKET_API);

function Home() {
  const dispatch = useDispatch();

  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    // Dispatch the getAllUsers actions
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("message", (message) => {
      dispatch(addMessageFromWebsocket(message));
    });
  }, [dispatch]);

  return (
    <Row className="mt-4">
      <Col>
        {messages.length > 0 &&
          messages.map((message) => (
            <MessageItem data={message} key={message.id} />
          ))}
      </Col>

      <AddMessage />
    </Row>
  );
}

export default Home;
