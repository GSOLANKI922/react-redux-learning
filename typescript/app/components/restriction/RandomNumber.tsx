import React from "react";
import ComponentRendere from "../ComponentRendere";

type RandomNumberProps = {
  number: number;
};

type IsPositive = RandomNumberProps & {
  isPositive: boolean;
  isNegative?: never;
  isZero?: never;
};

type IsNegative = RandomNumberProps & {
  isNegative: boolean;
  isPositive?: never;
  isZero?: never;
};

type IsZero = RandomNumberProps & {
  isZero: boolean;
  isPositive?: never;
  isNegative?: never;
};

type RandomNumber = IsPositive | IsNegative | IsZero;

const RandomNumber = ({
  number,
  isPositive,
  isNegative,
  isZero,
}: RandomNumber) => {
  return (
    <ComponentRendere>
      {number} {isPositive && "positive"} {isNegative && "negative"}{" "}
      {isZero && "zero"}
    </ComponentRendere>
  );
};

export default RandomNumber;
