import Wrapper from "components/Wrapper";
import Channels from "components/Channels";
import { useGetMessages } from "services/messagesApi";
import { useGetChannels } from "services/channelsApi";
import Chat from "components/Chat";

const MainPage = () => {
  const { isLoading: isMessagesLoading } = useGetMessages();
  const { isLoading: isChannelsLoading } = useGetChannels();

  return (
    <Wrapper isLoading={isMessagesLoading || isChannelsLoading} isPage>
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <Chat />
        </div>
      </div>
    </Wrapper>
  );
};

export default MainPage;
