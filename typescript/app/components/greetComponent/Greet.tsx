import React from "react";

type GreetProps = {
  isLogin: boolean;
  messageCount: number;
};
const Greet = (props: GreetProps) => {
  return <div>{props.messageCount}</div>;
};

export default Greet;
