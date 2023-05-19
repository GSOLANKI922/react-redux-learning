import React, { memo, useState } from "react";

const Chiled = ({ addMoreData, data }) => {
  console.log("click Child");
  return (
    <div>
      <ul>
        {data.length !== 0 ? (
          data?.map(({ count }, index) => {
            return <li key={index}>{count + index}</li>;
          })
        ) : (
          <h1>No Data</h1>
        )}
      </ul>
      <button onClick={addMoreData}>Add Data</button>
    </div>
  );
};

export default memo(Chiled);
