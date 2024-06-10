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
import { PrivateRout, PublicRoute } from 'components/misc';
import { PAGE_ROUTS } from 'configs/pageRouts';
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
          <Route element={<PublicRoute />}>
            <Route path={PAGE_ROUTS.LOGIN} element={<LoginPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path={PAGE_ROUTS.SIGNUP} element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRout />}>
            <Route path={PAGE_ROUTS.MAIN} element={<MainPage />} />
          </Route>
          <Route path={PAGE_ROUTS.NOT_FOUND} element={<NotFoundPage />} />
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
