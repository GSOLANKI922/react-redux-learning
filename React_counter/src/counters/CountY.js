import React, { useState } from "react";

const CountY = () => {
    const [count, setCount] = useState(0);
    const clickHandler = () => {
      setCount(count + 1);
    };
  return <div>
  </div>;
};


export default CountY;
