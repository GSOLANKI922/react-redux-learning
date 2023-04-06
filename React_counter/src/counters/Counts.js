import React, { useState } from "react";
import CountY from "./CountY";

const Counts = () => {
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={clickHandler}>Click</button>
      <CountY count={count} clickHandler={clickHandler} />
    </div>
  );
};

export default Counts;
