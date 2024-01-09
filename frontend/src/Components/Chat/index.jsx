import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentMessages } from "../../slices/messages";
import Message from "./Message";
import MessageForm from "./MessageForm";

const Chat = () => {
  const messages = useSelector(selectCurrentMessages);

  return (
    <div>
      <div>
      {messages.map(({ id, username, body }) => (
        <Message
          key={id}
          username={username}
          body={body}
        />
      ))}
      </div>
      <MessageForm />
    </div>
  )
}

export default Chat;
