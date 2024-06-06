import { useTranslation } from "react-i18next";

const ChatHeader = ({ channelName = "", count }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      {channelName && (
        <p className="m-0">
          <b>{`# ${channelName}`}</b>
        </p>
      )}
      <span className="text-muted">{`${count} ${t("chat.messagesCount", {
        count,
      })}`}</span>
    </div>
  );
};

export default ChatHeader;
