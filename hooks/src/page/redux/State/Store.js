import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slice/CounterSlice";

const Store = configureStore({
  reducer: {
    counterSlice,
  },
});

export default Store;
