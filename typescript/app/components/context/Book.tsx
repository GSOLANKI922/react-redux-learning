import React from "react";
import { theamContext } from "./TheamContext";
import ComponentRendere from "../ComponentRendere";

const Book = () => {
  const context = React.useContext(theamContext);
  return (
    <ComponentRendere>
      <div
        style={{
          color: context.secondary.color,
          backgroundColor: context.secondary.backgroundColor,
        }}
      >
        Book
      </div>
    </ComponentRendere>
  );
};

export default Book;
