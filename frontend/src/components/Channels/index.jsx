import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useGetChannels } from 'api/channelsApi';
import { selectCurrentChannelId, setCurrentChannel } from 'slices/uiSlice';
import Channel from "./Channel";

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels = [], isLoading } = useGetChannels();
  const currentChannelId = useSelector(selectCurrentChannelId);

  const handleSelect = (channel) => () => {
    dispatch(setCurrentChannel(channel));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
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
