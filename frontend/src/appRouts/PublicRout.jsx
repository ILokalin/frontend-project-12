import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "slices/authSlice";
import ROUTES from "api/apiConfig";

const PublicRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navigate to={ROUTES.MAIN_PAGE} /> : <Outlet />;
};

export default PublicRoute;
