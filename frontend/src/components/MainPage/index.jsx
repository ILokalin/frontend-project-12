import React, { useEffect } from "react";
import Wrapper from "components/Wrapper";
import Channels from "components/Channels";
import Chat from 'components/Chat';

const MainPage = () => {

  return (
    <Wrapper>
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
