import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "slices/authSlice";
import ROUTES from "api/apiConfig";

const PrivateRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN_PAGE} />;
};

export default PrivateRoute;
