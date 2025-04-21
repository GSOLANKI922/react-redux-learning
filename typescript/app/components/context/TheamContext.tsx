import { theam } from "./theam";
import { createContext } from "react";

export type TheamContextProps = {
  children: React.ReactNode;
};
export const theamContext = createContext(theam);

const TheamContextProvider = ({ children }: TheamContextProps) => {
  return (
    <theamContext.Provider value={theam}>{children}</theamContext.Provider>
  );
};

export default TheamContextProvider;
