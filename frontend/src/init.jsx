import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";
import { io } from "socket.io-client";
import channelsApi from "services/channelsApi";
import messagesApi from "services/messagesApi";
import { setCurrentChannel } from "redux/slices/uiSlice";
import App from "./App";
import { rollbarConfig } from "./configs/rollbar";
import store from "./redux/store";
import { ModalProvider } from "context/ModalContext";
import Modal from "components/Modal";

const init = () => {
  const socket = io();

  const listenerNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        "getChannels",
        undefined,
        (draftChannels) => {
          draftChannels.push(payload);
        }
      )
    );
  };

  const listenerRemoveChannel = (payload) => {
    const state = store.getState();
    if (state.ui.currentChannelId === payload.id) {
      store.dispatch(setCurrentChannel(state.ui.defaultChannelId));
    }
    store.dispatch(
      channelsApi.util.updateQueryData(
        "getChannels",
        undefined,
        (draftChannels) => {
          return draftChannels.filter(({ id }) => id !== payload.id);
        }
      )
    );
  };

  const listenerRenameChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        "getChannels",
        undefined,
        (draftChannels) => {
          const channel = draftChannels.find((item) => item.id === payload.id);
          channel.name = payload.name;
          if (channel) {
            channel.name = payload.name;
          }
        }
      )
    );
  };

  const listenerNewMessage = (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData(
        "getMessages",
        undefined,
        (draftMessage) => {
          draftMessage.push(payload);
        }
      )
    );
  };

  socket.on("newChannel", listenerNewChannel);
  socket.on("removeChannel", listenerRemoveChannel);
  socket.on("renameChannel", listenerRenameChannel);
  socket.on("newMessage", listenerNewMessage);

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Router>
            <ModalProvider>
              <App />
              <Modal />
            </ModalProvider>
          </Router>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default init;
