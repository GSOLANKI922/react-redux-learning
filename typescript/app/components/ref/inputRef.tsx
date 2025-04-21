import React, { useEffect, useRef } from "react";
import Input from "../Input";
import ComponentRendere from "../ComponentRendere";

const InputRef = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <ComponentRendere>
      <Input handalChage={(event) => console.log(event)} ref={inputRef} />
    </ComponentRendere>
  );
};
``;
export default InputRef;
