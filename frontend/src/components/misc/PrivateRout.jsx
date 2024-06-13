import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/slices/authSlice';
import { PAGE_LOGIN, getPage } from 'configs/pageRouts';

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to={getPage(PAGE_LOGIN)} />;
};

export default PrivateRoute;
