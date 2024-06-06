import { useSelector } from 'react-redux';
import { selectCurrentChannel } from 'services/channelsApi';
import { selectCurrentMessages } from 'services/messagesApi';
import Message from './Message';
import MessageForm from './MessageForm';
import ChatHeader from './ChatHeader';

const Chat = () => {
  const channel = useSelector(selectCurrentChannel);
  const messages = useSelector(selectCurrentMessages);

  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader channelName={channel?.name} count={messages.length} />
      <div className="chat-messages overflow-auto px-5 ">
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
