import React, { useEffect, useState } from "react";

const UseEffectHook = () => {
  const [count, setCount] = useState();
  const [count_1, setCount_1] = useState(0);
  const [count_2, setCount_2] = useState(0);

  console.log("call top");
  const callApi = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then(async (res) => await res.json())
      .then((data) => console.log(setCount(data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("call UseEffect");
    document.title = count_1 === 0 ? "Cahts" : `Chets(${count_1})`;
    // callApi();
    return () => {
      console.log("unMount _1");
      console.log(count_1);
      console.log("unMount_2");
    };
  }, []);

  console.log(count, "call Down");
  return (
    <div style={{ border: "2px solid black", width: "25%", padding: "1rem" }}>
      <h1>UseEffect</h1>
      <ul>
        {count?.map(({ id, body, title }) => {
          return (
            <h1 key={id}>
              <li>{title}</li>
            </h1>
          );
        })}
      </ul>
      <button onClick={() => setCount_1((pre) => pre + 1)}>Click</button>
      <h1>{count_1}</h1>
      <button onClick={() => setCount_2((pre) => pre + 1)}>Click</button>
      <h1>{count_2}</h1>
    </div>
  );
};

export default UseEffectHook;
