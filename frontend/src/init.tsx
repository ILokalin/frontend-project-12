import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import store from "./slices";
import { io } from 'socket.io-client';

const init = () => {



  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default init;
