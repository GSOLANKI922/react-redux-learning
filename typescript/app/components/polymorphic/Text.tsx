import React from "react";

type TextProps<E extends React.ElementType> = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  version: "primery" | "secondary";
  as?: E;
};

type TextExtedProps<E extends React.ElementType> = TextProps<E> &
  Omit<React.ComponentProps<E>, keyof TextProps<E>>;

const Text = <E extends React.ElementType = "div">({
  children,
  version,
  size,
  as,
  ...rest
}: TextExtedProps<E>) => {
  const Component = as || "div";
  return (
    <Component className={`${version} ${size}`} {...rest}>
      {children}
    </Component>
  );
};

export default Text;
