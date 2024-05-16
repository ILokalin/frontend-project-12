import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import channelsApi from "api/channelsApi";
import messagesApi from "api/messagesApi";
import { setCurrentChannel } from 'slices/uiSlice';
import App from "./App";
import { rollbarConfig } from './rollbarConfig';
import store from "./store";
import { io } from 'socket.io-client';

const init = () => {
  const socket = io();

  const listenerNewChannel = (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload);
    }));
  };

  const listenerRemoveChannel = (payload) => {
    const state = store.getState();
    if (state.ui.currentChannelId === payload.id) {
      store.dispatch(setCurrentChannel(state.ui.defaultChannelId));
    }
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      return draftChannels.filter(({ id }) => id !== payload.id);
    }));
  };

  const listenerRenameChannel = (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find((item) => item.id === payload.id);
      channel.name = payload.name;
      if (channel) {
        channel.name = payload.name;
      }
    }));
  };

  const listenerNewMessage = (payload) => {
    debugger
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessage) => {
      draftMessage.push(payload);
    }));
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('removeChannel', listenerRemoveChannel);
  socket.on('renameChannel', listenerRenameChannel);
  socket.on('newMessage', listenerNewMessage);

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Router>
            <App />
          </Router>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
}

export default init;
