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

interface AuthContextType {
  user: User | null;
  logIn: (data: User) => void;
  logOut: () => void;
  getAuthHeader: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  const currentUser = getAuth() as User | null;
  const [user, setUser] = useState<User | null>(currentUser);

  useEffect(() => {
    if (!user) {
      clearAuth();
      return;
    }
    setAuth(user);
  }, [user]);

  const logIn = useCallback((data: User) => {
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

  const contextValue: AuthContextType = useMemo(
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
