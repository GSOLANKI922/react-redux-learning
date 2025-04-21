import React from "react";
import Button from "~/components/Button";
import ComponentRendere from "~/components/ComponentRendere";
import { useUserAction } from "./UserContext";

const LogInUser = () => {
  const { user, setUser } = useUserAction();
  const userData = { name: "Gautam", email: "wHs4k@example.com" };

  return (
    <ComponentRendere>
      <div className="flex">
        <Button handalClick={() => setUser(userData)}>Login</Button>
        <Button handalClick={() => setUser(null)}>Logout</Button>
      </div>
      <div>User Name: {user?.name}</div>
      <div>User Email: {user?.email}</div>
    </ComponentRendere>
  );
};

export default LogInUser;
