export const ChatHeader = ({ channelName = "", messagesCount }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    {channelName && (
      <p className="m-0">
        <b>{`# ${channelName}`}</b>
      </p>
    )}
    <span className="text-muted">{`${messagesCount} Сообщений`}</span>
  </div>
);

export default ChatHeader;
