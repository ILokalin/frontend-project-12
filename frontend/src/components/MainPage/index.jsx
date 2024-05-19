import React from "react";
import Wrapper from "components/Wrapper";
import Channels from "components/Channels";
import { useGetMessages } from "api/messagesApi";
import { useGetChannels } from "api/channelsApi";
import Chat from "components/Chat";

const MainPage = () => {
  const { isLoading: isMessagesLoading } = useGetMessages();
  const { isLoading: isChannelsLoading } = useGetChannels();

  return (
    <Wrapper isLoading={isMessagesLoading || isChannelsLoading}>
      <Channels />
      <div className="col p-0 h-100">
        <Chat />
      </div>
    </Wrapper>
  );
};

export default MainPage;
