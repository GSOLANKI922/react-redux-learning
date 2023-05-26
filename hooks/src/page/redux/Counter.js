import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decremet, increMent } from "./slice/CounterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counterSlice.count);
  const dispetch = useDispatch();
  console.log(count, "count");
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispetch(decremet(10))}>DEC</button>
      <button onClick={() => dispetch(increMent(8))}>INC</button>
    </div>
  );
};

export default Counter;
