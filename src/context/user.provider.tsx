"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import { getCurrentUser } from "../services/AuthService";

export const UserContext = createContext<IUserContext | undefined>(undefined);

interface IUserContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  query: {
    searchTerm: string;
    sort: string;
    // limit: number;
    // page: number;
  };
  setQuery: Dispatch<
    SetStateAction<{
      searchTerm: string;
      sort: string;
      // limit: number;
      // page: number;
    }>
  >;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [query, setQuery] = useState({
    searchTerm: "",
    sort: "",
    // limit: 0,
    // page: 0,
  });

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider
      value={{ isLoading, setIsLoading, setUser, user, query, setQuery }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the userProvider context");
  }
  return context;
};

export default UserProvider;
