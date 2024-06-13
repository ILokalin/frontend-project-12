import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer as Toaster, Zoom, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectUiError, selectIsUiError } from 'redux/slices/uiSelectors';
import NotFoundPage from 'components/NotFound';
import LoginPage from 'components/Auth/Login';
import SignupPage from 'components/Auth/Signup';
import MainPage from 'components/Main';
import PrivateRout from 'components/misc/PrivateRout';
import {
  getPage,
  PAGE_LOGIN,
  PAGE_MAIN,
  PAGE_NOT_FOUND,
  PAGE_SIGNUP,
} from 'configs/pageRouts';
import Modal from 'components/Modal';
import Header from 'components/Header';

const App = () => {
  const { t } = useTranslation();
  const uiError = useSelector(selectUiError);
  const isUiError = useSelector(selectIsUiError);

  useEffect(() => {
    if (isUiError) {
      toast.error(t(`global.error.${uiError}`));
    }
  }, [uiError, isUiError, t]);

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={getPage(PAGE_LOGIN)} element={<LoginPage />} />
          <Route path={getPage(PAGE_SIGNUP)} element={<SignupPage />} />
          <Route element={<PrivateRout />}>
            <Route path={getPage(PAGE_MAIN)} element={<MainPage />} />
          </Route>
          <Route path={getPage(PAGE_NOT_FOUND)} element={<NotFoundPage />} />
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
