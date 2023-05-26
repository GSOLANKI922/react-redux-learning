import React from "react";

const RedCounter = (props) => {
  return (
    <div style={{backgroundColor:"red", height:"100px", width:"100px"}}>
      <props.cmp />
    </div>
  );
};

export default RedCounter;
