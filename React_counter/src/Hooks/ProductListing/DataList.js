import React, { useState } from "react";
import { places } from "./Data";

const DataList = () => {
  const [imgHW, setImgHW] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [singleSelectedImg, setSingleSelectedImg] = useState(false);
  console.log(selectedId, "selectedId");

  const singleCheckHandler = (ImgId) => {
    const select = places.find((elem) => elem.id === ImgId);
    const chackSame = selectedId.find((elem) => elem.id === ImgId);
    if (!chackSame) {
      console.log("adds");
      setSelectedId([...selectedId, select]);
    } else if (singleSelectedImg || !singleSelectedImg) {
      console.log("del");
      const deleteItem = selectedId?.filter((elem) => elem.id !== ImgId);
      setSelectedId(deleteItem);
    } else if (imgHW) {
      setImgHW(false);
    }
  };

  const allChack = () => {
    if (!imgHW) {
      setSelectedId(places);
      setSingleSelectedImg(true);
    } else {
      setSelectedId([]);
      setSingleSelectedImg(false);
    }
  };

  return (
    <div>
      <h1> Shoping Item</h1>
      <input
        type="checkbox"
        onChange={(e) => setImgHW(e.target.checked)}
        onClick={allChack}
        checked={imgHW}
      />
      <ul style={{ display: "flex", gap: "2rem" }}>
        {places.map((elem) => {
          return (
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid black",
                gap: "2rem",
                alignItems: "center",
                padding: "1rem",
                flexWrap: "wrap",
              }}
              key={elem.id}
            >
              <img
                src={`https://i.imgur.com/${elem.imageId}l.jpg`}
                height={imgHW ? 200 : 100}
                width={imgHW ? 200 : 100}
              />
              <span>
                <b>{elem.name} </b> : {elem.description}
              </span>
              <input
                type="checkbox"
                onChange={(e) => setSingleSelectedImg(e.target.checked)}
                onClick={() => singleCheckHandler(elem.id)}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <h1>Purchesh Item</h1>
        <ul style={{ display: "flex", gap: "2rem" }}>
          {selectedId.length > 0 ? (
            selectedId.map((elem) => {
              return (
                <li
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid black",
                    gap: "2rem",
                    alignItems: "center",
                    padding: "1rem",
                    flexWrap: "wrap",
                  }}
                  key={elem.id}
                >
                  <img
                    src={`https://i.imgur.com/${elem.imageId}l.jpg`}
                    height={imgHW ? 200 : 100}
                    width={imgHW ? 200 : 100}
                  />
                  <span>
                    <b>{elem.name} </b> : {elem.description}
                  </span>
                </li>
              );
            })
          ) : (
            <h1>No Data</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DataList;
