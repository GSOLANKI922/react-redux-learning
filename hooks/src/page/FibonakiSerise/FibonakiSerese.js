import React from "react";

const FibonakiSerese = () => {
  let FibSere = [0, 1];
  for (let i = 2; i <= 10; i++) {
   let curData = FibSere[i - 1] + FibSere[i - 2];
    FibSere.push(curData)
  }

  console.log(FibSere, "FibSere");
};

export default FibonakiSerese;
