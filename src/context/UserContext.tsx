import React, { useEffect, useState } from "react";
import { UserT } from "../types/user.type";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../constants";

export type UserContextType = {
  user: UserT | null;
  setUser: (user: UserT) => void;
  logout: () => void;
};

const initialState: UserContextType = {
  user: null,
  logout: () => {},
  setUser: () => {},
};

export const UserContext = React.createContext(initialState);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserT | null>(null);

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    window.location.reload();
  };

  const initUserFromStorage = () => {
    try {
      const usersStr = localStorage.getItem(USER_STORAGE_KEY) || "";
      const _user = JSON.parse(usersStr);
      if (_user.email && _user.id) {
        setUser(_user);
      }
    } catch (err) {
      setUser(null);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      console.log("ERROR inti user from storage::", err);
      // TODO: navigate to login
    }
  };

  useEffect(() => {
    initUserFromStorage();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
