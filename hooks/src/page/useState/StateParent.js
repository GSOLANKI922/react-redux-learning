import React, { useEffect, useState } from "react";

const StateParent = () => {
  const [data, setData] = useState(false);

  return (
    <div style={{ border: "2px solid black", width: "25%", padding: "1rem" }}>
      <h3>{data ? "Gautam" : "SOlanki" }</h3>
      <button onClick={() => setData(!data)}>Click</button>
    </div>
  );
};

export default StateParent;
