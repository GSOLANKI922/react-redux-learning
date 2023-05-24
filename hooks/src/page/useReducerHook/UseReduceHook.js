import React, { useReducer } from "react";
import Reducers from "./Reducers";

const initialVal = 0;
const UseReduceHook = () => {
  const [state, dispatch] = useReducer(Reducers, initialVal);
  return (
    <div
      style={{
        border: "2px solid black",
        width: "25%",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <h1>useReducer</h1>
      <p>{state}</p>
      <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
        <button onClick={() => dispatch({ type: "DECREMENT" })}> - </button>
        <button onClick={() => dispatch({ type: "INCREMENT" })}> + </button>
      </div>
    </div>
  );
};

export default UseReduceHook;
