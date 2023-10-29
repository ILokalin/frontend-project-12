import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ROUTES from "../../apiConfig";

const PublicRoute = () => {
  const auth = useAuth();

  return auth.user ? <Navigate to={ROUTES.MAIN_PAGE} /> : <Outlet />;
};

export default PublicRoute;
