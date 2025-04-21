import React from "react";
import ComponentRendere from "../ComponentRendere";

type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "center" | "bottom";
type TostPosition = {
  position:
    | Exclude<`${HorizontalPosition}-${VerticalPosition}`, "center-center">
    | "center";
};
const Tost = ({ position }: TostPosition) => {
  return (
    <ComponentRendere>
      <div className={position}>Tost</div>
    </ComponentRendere>
  );
};

export default Tost;
