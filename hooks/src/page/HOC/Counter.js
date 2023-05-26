import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>{count}</h3>
      <button onClick={() => setCount((pre) => pre + 1)}> + </button>
    </div>
  );
};

export default Counter;
