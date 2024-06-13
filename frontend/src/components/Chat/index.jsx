import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentChannel } from 'services/channelsApi';
import { selectCurrentMessages } from 'services/messagesApi';
import Message from './Message';
import MessageForm from './MessageForm';
import ChatHeader from './ChatHeader';
import { SCROLL_TYPE } from './constants';

const Chat = () => {
  const pageRef = useRef(null);
  const channel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectCurrentMessages);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollTo({
        top: pageRef.current.scrollHeight,
        behavior: SCROLL_TYPE,
      });
    }
  }, [channel, messages.length]);

  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader channelName={channel?.name} count={messages.length} />
      <div ref={pageRef} className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm />
      </div>
    </div>
  );
};

export default Chat;
