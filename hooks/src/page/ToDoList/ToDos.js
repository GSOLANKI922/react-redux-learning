import React, { useEffect, useState } from "react";

const ToDos = () => {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState(
    JSON?.parse(localStorage.getItem("todos")) || []
  );
  const [editId, setEditId] = useState();
  const [isEdit, setIsEdit] = useState(false);

  console.log(lists, "list");

  //   const getLocalStorageData = () => {
  //     const localData = localStorage.getItem("todos") || [];
  //     console.log(localData, "localData");
  //     setLists(localData);
  //   };

  //   useEffect(() => {
  //     console.log("1st");
  //     getLocalStorageData();
  //   }, []);

  const setDataForLocalSTrorage = () => {
    localStorage.setItem("todos", JSON?.stringify(lists));
  };

  useEffect(() => {
    console.log(lists, "inner");
    if (lists.length > 0) {
      console.log(lists, "InIf");
      setDataForLocalSTrorage();
    }
  }, [lists]);

  const clickHandler = () => {
    if (input.trim() && !isEdit) {
      setLists([...lists, input]);
    } else {
      if (input.trim()) {
        let editData = lists.map((elem, id) => {
          return editId === id ? input : elem;
        });
        setLists(editData);
      } else {
        setLists(lists.filter((list, id) => id !== editId));
      }
      setIsEdit(false);
    }
    setInput("");
  };

  const deleteHandler = (IDD) => {
    setLists(lists.filter((list, id) => id !== IDD));
  };

  const editHandler = (list, IDE) => {
    setEditId(IDE);
    setInput(list);
    setIsEdit(true);
  };

  const clacleEditHandler = () => {
    setIsEdit(false);
    setInput("");
  };

  return (
    <div
      style={{
        height: "50rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "lightblue",
          width: "30%",
          height: "60%",
          marginTop: "50px",
        }}
      >
        <div style={{ marginTop: "30px" }}>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            name="todo"
          />
          <button onClick={() => clickHandler()}>
            {!isEdit ? "ADD" : "EDIT"}
          </button>
          {isEdit && <button onClick={clacleEditHandler}>Cancle EDIT</button>}
        </div>
        <div style={{ height: "43vh" }}>
          <ul>
            {lists.length !== 0 ? (
              lists?.map((list, id) => {
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: "5px",
                    }}
                  >
                    <li>{list}</li>
                    <button onClick={() => deleteHandler(id)}>DEL</button>
                    <button onClick={() => editHandler(list, id)}>EDIT</button>
                  </div>
                );
              })
            ) : (
              <h3>No Data Found</h3>
            )}
          </ul>
        </div>
        <div>
          <button
            onClick={() => {
              setLists([]);
              setInput("");
              setIsEdit(false);
            }}
          >
            ClearAll
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDos;
