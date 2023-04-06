import React, { useState } from "react";

const SateMangeMent = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 3);
        }}
      >
        +3
      </button>
    </>
  );
};

export default SateMangeMent;

