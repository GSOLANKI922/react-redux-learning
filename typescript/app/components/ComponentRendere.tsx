import React from "react";

type Props = {
  children: React.ReactNode;
};

const ComponentRendere = ({ children }: Props) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      {children}
    </div>
  );
};

export default ComponentRendere;
