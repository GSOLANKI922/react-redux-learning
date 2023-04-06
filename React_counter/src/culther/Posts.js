import React, { useState } from "react";
import { sculptureList } from "../Data";

const Posts = () => {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);


  const nextPostHandler = () => {
    if (index == sculptureList.length - 1) {
      setIndex(0);
      setShowMore(false)
    } else {
      setIndex(index + 1);
      setShowMore(false)
    }
  };

  let sculpture = sculptureList[index];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "2rem",
      }}
    >
      <div style={{ border: "2px solid black", textAlign:"center" }}>
        <img src={sculpture.url} alt={sculpture.alt} height={200} width={200}/>
        <h1>{index + 1} of {sculptureList.length}</h1>
        <h1>{sculpture.name}</h1>
        <p>{sculpture.artist}</p>
        <button onClick={() => setShowMore(!showMore)}>{showMore ? "Hide" : "Show"} Description</button><br/>
        {showMore && <p>{sculpture.description.slice(0, 100)}</p>}
        <button onClick={() => nextPostHandler()}>Next</button>
      </div>
    </div>
    
  );
};

export default Posts;
