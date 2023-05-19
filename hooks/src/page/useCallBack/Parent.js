import React, { memo, useCallback, useState } from "react";
import Chiled from "./Chiled";

const Parent = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const addMoreData = useCallback(() => {
    setData([...data, { count: "count" }]);
  }, [data]);
  return (
    <div style={{border:"2px solid black", width:"25%", padding:"1rem"}}>
    <h1>UseCallBack</h1>
      <Chiled addMoreData={addMoreData} data={data} />
      <div>
        count : {count}
        <button onClick={() => setCount((pre) => pre + 1)}> + </button>
      </div>
    </div>
  );
};

export default memo(Parent);