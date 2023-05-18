import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [contextData, setContextData] = useState(null);

  return (
    <DataContext.Provider value={{ contextData, setContextData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
