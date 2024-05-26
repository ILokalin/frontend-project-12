import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "redux/slices/authSlice";
import PAGES from "configs/routs";

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to={PAGES.LOGIN} />;
};

export default PrivateRoute;
