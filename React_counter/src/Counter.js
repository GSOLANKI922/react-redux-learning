import React, { useState } from "react";

const Counter = ({ color }) => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "2px solid red", width: "100px"}}>
      <h1 style={{color: color}}>{count}</h1>
      <button onClick={() => setCount(count + 1)} count={count}>click</button>
    </div>
  );
};

export default Counter;

