import React from "react";

const Currying = () => {
  const AllData = (a) => (b) => (c) => (d) => (e) => a + b + c + d + e;
  console.log(AllData(2)(5)(8)(9)(10));
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Currying;
