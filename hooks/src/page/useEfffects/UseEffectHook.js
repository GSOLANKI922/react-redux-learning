import React, { useEffect, useState } from "react";

const UseEffectHook = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `count ${count}`;
  });
  return (
    <div style={{ border: "2px solid black", width: "25%", padding: "1rem" }}>
      <h1>{count}</h1>
      <button onClick={() => setCount((pre) => pre + 1)}>Click</button>
    </div>
  );
};

export default UseEffectHook;
