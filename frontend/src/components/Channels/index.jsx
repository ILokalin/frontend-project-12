import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   selectChannelsList,
//   selectCurrentChannelId,
//   setCurrentChannel,
// } from "../../slices/channels";
import { useGetChannels } from 'api/channelsApi';
import Channel from "./Channel";

const Channels = () => {
  const dispatch = useDispatch();
  const { data = [], isLoading } = useGetChannels();

  // const channels = [];
  const currentChannelId = '';
  // const channels = useSelector(selectChannelsList);
  // const currentChannelId = useSelector(selectCurrentChannelId);

  const handleSelect = (channel) => () => {
    // dispatch(setCurrentChannel(channel));
  };

  // useEffect(
  //   () => {
  //     const isL = isLoading
  //     // const t = data;
  //     debugger  
  //   },
  //   [data, isLoading]
  // )

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div>
        <p>Каналы</p>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {data.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleSelect={handleSelect(channel)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
