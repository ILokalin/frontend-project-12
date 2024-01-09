import { createContext, useContext } from 'react';
import { useDispatch } from "react-redux"; 
import { setMessage } from '../slices/messages';

const ChatContext = createContext();

const ChatProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(setMessage(message));
  });

  const createSocketRequest = (event, data) => new Promise(
    (resolve, reject) => {
      socket.timeout(5000).volatile.emit(event, data, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    },
  );

  const api = {
    sendMessage: (message) => createSocketRequest('newMessage', message),
  }

  return (
    <ChatContext.Provider value={api}>
      {children}
    </ChatContext.Provider>
  )
}

export const useApi = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};

export default ChatProvider;
