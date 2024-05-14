import React, { useEffect } from "react";
import Wrapper from "components/Wrapper";
import Channels from "components/Channels";
// import Chat from '../Chat';

const MainPage = () => {
  // const { data, isLoading } = useGetChannelsQuery();

  return (
    <Wrapper>
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        {/* <Chat /> */}
        <div className="col p-0 h-100"></div>
      </div>
    </Wrapper>
  );
};

export default MainPage;
