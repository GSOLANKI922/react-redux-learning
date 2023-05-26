import React from "react";

const GreenCOunter = (props) => {
  return (
    <div style={{backgroundColor:"green", height:"100px", width:"100px"}}>
      <props.cmp />
    </div>
  );
};

export default GreenCOunter;
