import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentChannel } from "api/channelsApi";
import { selectCurrentMessages, useGetMessages } from "api/messagesApi";
import Message from "./Message";
import MessageForm from "./MessageForm";

const Chat = () => {
  const { isLoading } = useGetMessages();
  const channel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectCurrentMessages);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        {channel && <p className="m-0">
          <b>
            {`# ${channel?.name}`}
          </b>
        </p>}
        <span className="text-muted">
          {`${messages.length} Сообщений`}
        </span>
      </div>
      <div className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, body }) => (
          <Message
            key={id}
            username={username}
            body={body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm />
      </div>
    </div>
  )
}

export default Chat;
