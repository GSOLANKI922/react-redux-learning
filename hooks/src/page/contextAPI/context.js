import React, { createContext, useContext, useState } from "react";

export const curContext = createContext();

const Context = ({ children }) => {
  const curData = useContext(curContext);
  const [curVal, setcurVal] = useState(10);

  return <curData value={{ curVal, setcurVal }}>{children}</curData>;
};

export default Context;
