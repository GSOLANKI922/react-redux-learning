import React, { type ProfilerProps } from "react";
import Login from "./Login";
import ComponentRendere from "../ComponentRendere";
import type { ProfileProps } from "./Profile";

type Props = {
  isLogdin: boolean;
  component: React.ComponentType<ProfileProps>;
};
const Private = ({ isLogdin, component: Component }: Props) => {
  return (
    <ComponentRendere>
      {!isLogdin ? <Login /> : <Component name="Gautam" />}
    </ComponentRendere>
  );
};

export default Private;
