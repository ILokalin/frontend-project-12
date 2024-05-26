import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "redux/slices/authSlice";
import PAGES from "configs/routs";

const PublicRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navigate to={PAGES.MAIN} /> : <Outlet />;
};

export default PublicRoute;
