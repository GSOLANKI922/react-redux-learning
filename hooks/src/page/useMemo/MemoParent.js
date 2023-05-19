import React, { useMemo, useState } from "react";

const MemoParent = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  const clickHandler = () => {
    setCount(count + 1);
  };

  const countNumber = (num) => {
    console.time("runtime");
    for (let i = 0; i <= 1000000000; i++) {}
    console.timeEnd("runtime");
    return num;
  };

  const newCount = useMemo(() => {
    return countNumber(count);
  }, [count]);

  return (
    <div style={{ border: "2px solid black", width: "25%", padding: "1rem" }}>
      <h1>UseMemo</h1>
      <h4>Count : {newCount}</h4>
      <button onClick={clickHandler}> + </button>
      <button onClick={() => setShow(!show)}>
        {show ? "You Clicked Me" : "Click Me"}
      </button>
    </div>
  );
};

export default MemoParent;
