import React, { useReducer } from "react";
import Button from "../Button";
import ComponentRendere from "../ComponentRendere";

type CounterProps = {
  count: number;
};

type UpdateAction = {
  type: "INCREMENT" | "DECREMENT";
  payload: number;
};

type ResetAction = {
  type: "RESET";
};

type Action = UpdateAction | ResetAction;

const initialState = { count: 0 };
const reducer = (state: CounterProps, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload };
    case "DECREMENT":
      return { count: state.count - action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ComponentRendere>
      <h2>Count : {state.count}</h2>
      <div className="flex">
        <Button
          handalClick={() => dispatch({ type: "INCREMENT", payload: 10 })}
        >
          Increment 10
        </Button>
        <Button
          handalClick={() => dispatch({ type: "DECREMENT", payload: 10 })}
        >
          Decrement 10
        </Button>
        <Button handalClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      </div>
    </ComponentRendere>
  );
};

export default Counter;
