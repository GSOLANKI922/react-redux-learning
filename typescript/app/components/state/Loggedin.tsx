import React from "react";
import Button from "../Button";
import ComponentRendere from "../ComponentRendere";

const Loggedin = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <ComponentRendere>
      <h1>Logged In</h1>
      <div className="flex">
        <Button handalClick={() => setLoggedIn(true)}>Login</Button>
        <Button handalClick={() => setLoggedIn(false)}>Logout</Button>
      </div>
      <div>Logged {loggedIn ? "in" : "out"}</div>
    </ComponentRendere>
  );
};

export default Loggedin;
