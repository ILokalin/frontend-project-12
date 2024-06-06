import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/slices/authSlice';
import { PAGE_ROUTS } from 'configs/pageRouts';

const PublicRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navigate to={PAGE_ROUTS.MAIN} /> : <Outlet />;
};

export default PublicRoute;
