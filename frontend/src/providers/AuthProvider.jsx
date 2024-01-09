import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { getAuth, setAuth, clearAuth, User } from "../utils/tokenUtils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const currentUser = getAuth();
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (!user) {
      clearAuth();
      return;
    }
    setAuth(user);
  }, [user]);

  const logIn = useCallback((data) => {
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
  }, [dispatch]);

  const getAuthHeader = useCallback(() => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }

    return { Authorization: "" };
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      logIn,
      logOut,
      getAuthHeader,
    }),
    [user, logIn, logOut, getAuthHeader]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};

export default AuthProvider;
