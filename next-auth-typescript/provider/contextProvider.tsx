"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// Define your context type
interface AppContextType {
  userData: {
    token: string;
    refreshToken: string;
    user: {
      name: string;
      email: string;
    };
  };
  setUserData: Dispatch<
    SetStateAction<{
      token: string;
      user: {
        name: string;
        email: string;
      };
      refreshToken: string;
    }>
  >;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState({
    token: "",
    refreshToken: "",
    user: {
      name: "",
      email: "",    
    },
  });

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <AppContext.Provider value={{ setUserData, userData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
