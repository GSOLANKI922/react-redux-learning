import React from "react";
import type Greet from "./Greet";

const CustomComponent = ({
  isLogin,
  messageCount,
}: React.ComponentProps<typeof Greet>) => {
  return <div>{isLogin ? messageCount : 0}</div>;
};

export default CustomComponent;
