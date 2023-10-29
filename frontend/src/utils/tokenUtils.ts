export interface User {
  token: string;
  username: string;
}

export const setAuth = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuth = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("user");
};
