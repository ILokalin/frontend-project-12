import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/slices/authSlice';
import { PAGE_MAIN, getPage } from 'configs/pageRouts';

const PublicRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navigate to={getPage(PAGE_MAIN)} /> : <Outlet />;
};

export default PublicRoute;
