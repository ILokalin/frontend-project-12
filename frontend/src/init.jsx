import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import leoProfanity from 'leo-profanity';
import channelsApi from 'services/channelsApi';
import messagesApi from 'services/messagesApi';
import { setCurrentChannel } from 'redux/slices/uiSlice';
import resources from 'locales/index.js';
import { rollbarConfig } from 'configs/rollbar';
import store from 'redux/store';
import { ModalProvider } from 'context/ModalContext';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const init = async () => {
  const socket = io();

  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const listenerNewChannel = (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData(
        'getChannels',
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
        'getChannels',
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
        'getChannels',
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
        'getMessages',
        undefined,
        (draftMessage) => {
          draftMessage.push(payload);
        }
      )
    );
  };

  socket.on('newChannel', listenerNewChannel);
  socket.on('removeChannel', listenerRemoveChannel);
  socket.on('renameChannel', listenerRenameChannel);
  socket.on('newMessage', listenerNewMessage);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
