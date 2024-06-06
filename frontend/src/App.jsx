import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer as Toaster, Zoom } from 'react-toastify';
import NotFoundPage from "components/NotFound";
import LoginPage from "components/Auth/Login";
import SignupPage from "components/Auth/Signup";
import MainPage from "components/Main";
import { PrivateRout, PublicRoute } from "components/misc";
import PAGES from "./configs/routs";
import Modal from "components/Modal";
import Header from "components/Header";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={PAGES.LOGIN} element={<LoginPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path={PAGES.SIGNUP} element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRout />}>
            <Route path={PAGES.MAIN} element={<MainPage />} />
          </Route>
          <Route path={PAGES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <Modal />
    </Router>
  );
};

export default App;
