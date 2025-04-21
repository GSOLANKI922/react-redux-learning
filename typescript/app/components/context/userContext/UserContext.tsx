import { useState, createContext, useContext } from "react";

type User = {
  name: string;
  email: string;
};

type UserContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextProps | null>(null);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAction = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("No Context Found");
  return context;
};

export default UserContextProvider;
