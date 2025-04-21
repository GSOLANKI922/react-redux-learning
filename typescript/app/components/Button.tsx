import React, { Children } from "react";

type ButtonProps = {
  handalClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: string;
} & Omit<React.ComponentProps<"button">, "children">;
const Button = ({ handalClick, children }: ButtonProps) => {
  return (
    <div>
      <button
        onClick={handalClick}
        style={{
          border: "1px solid black",
          padding: "5px",
          margin: "5px",
          cursor: "pointer",
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
