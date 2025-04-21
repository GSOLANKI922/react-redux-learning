import React from "react";
type InputProps = React.ComponentProps<"input"> & {
  value?: string;
  handalChage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ value, handalChage, ...rest }: InputProps) => {
  return (
    <div>
      <input type="text" value={value} onChange={handalChage} {...rest} />
    </div>
  );
};

export default Input;
