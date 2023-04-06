import React from "react";
import { recipes } from "../Data";

const Parents = () => {
  return (
    <div>
      {recipes.map((elem) => {
        return (
          <ul key={elem.id}>
            <li>
              <h2>{elem.name}</h2>
                {elem.ingredients?.map((nElem, id) => {
                  return (
                    <ul key={id}>
                      <li>{id + 1} - {nElem}</li>
                    </ul>
                  );
                  
                })}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Parents;
