import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChannelEntity,
  selectChannelsSlice,
  setCurrentChannel,
} from "../../slices/channels";
import Channel from "./Channel";

const Channels = () => {
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector(selectChannelsSlice);

  const handleSelect = (channel: ChannelEntity) => () => {
    dispatch(setCurrentChannel(channel));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div>
        <p>Каналы</p>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
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
