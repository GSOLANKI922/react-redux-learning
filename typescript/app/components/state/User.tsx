import React, { useState } from "react";
import Button from "../Button";
import ComponentRendere from "../ComponentRendere";
type UserProps = {
  name: string;
  email: string;
};
const User = () => {
  const [User, setUser] = useState<UserProps>({} as UserProps);

  console.log(User);
  const handleLogin = () => {
    const user = { name: "Gautam", email: "wHs4k@example.com" };

    setUser(user);
  };
  return (
    <ComponentRendere>
      <div className="flex">
        <Button handalClick={() => handleLogin()}>Login</Button>
        <Button handalClick={() => setUser({} as UserProps)}>Logout</Button>
      </div>
      <div>User Name: {User?.name}</div>
      <div>User Email: {User?.email}</div>
    </ComponentRendere>
  );
};

export default User;
