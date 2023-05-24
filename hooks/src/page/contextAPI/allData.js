import React, { useContext } from "react";
import { curContext } from "./context";

const AllData = () => {
  const curVal = useContext(curContext);
  console.log(curVal, "context");
  return <div></div>;
};

export default AllData;
