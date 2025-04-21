import React from "react";
type ContainerProps = {
  styles: React.CSSProperties;
};
const Container = ({ styles }: ContainerProps) => {
  return <div style={styles}>Design</div>;
};

export default Container;
